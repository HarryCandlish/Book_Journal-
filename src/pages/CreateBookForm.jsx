import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createClient from '../client';

const CreateBookForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState(false);
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For previewing the selected image
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [location, setLocation] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slugValue = title.toLowerCase().replace(/\s+/g, '-');

    
  try {
    // Upload the image to Sanity and get the asset reference
    const uploadedImage = await createClient.assets.upload('image', image);

    const newBook = {
      _type: 'book',
      title,
      author,
      read,
      slug: {
        _type: 'slug',
        current: slugValue,
      },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id, // Use the ID of the uploaded asset
        },
      },
      genre,
      pages,
      location,
    };

    const createdBook = await createClient.create(newBook);

    console.log(createdBook);

    // Navigate to the new book's page
    navigate(`/book/${createdBook.slug.current}`);
  } catch (error) {
    console.error('Error creating a new book:', error);
  }
};

 

  return (
      <form onSubmit={handleSubmit}>
        <label>Title:<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></label><br/>
          <label>Author:<input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/></label><br/>
            <label>Read:<input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)}/></label><br/>
              <label>Slug:<input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}/></label><br/>
                <label>Image:<input type="file" onChange={handleImageChange}/>{imagePreview && <img src={imagePreview} alt="Preview"/>}</label><br/>
              <label>Genre:<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/></label><br/>
            <label>Pages:<input type="text" value={pages} onChange={(e) => setPages(e.target.value)}/></label><br/>
          <label>Location:<input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/></label><br/>
        <button type="submit">Create Book</button>
    </form>

  );
};

export default CreateBookForm;

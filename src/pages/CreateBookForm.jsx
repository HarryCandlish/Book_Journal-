import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createClient from '../client';

import '../styles/formstyles.css'

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
    navigate('/');
  } catch (error) {
    console.error('Error creating a new book:', error);
  }
};

 

  return (
    <div className="form-container">
      <form className="form-text" onSubmit={handleSubmit}>
        <label className="form-text">Title:<input className="form-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></label><br/>
          <label className="form-text">Author:<input className="form-input" type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/></label><br/>
            <label className="form-text">Read:<input className="form-input" type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)}/></label><br/>
              <label className="form-text">Slug:<input className="form-input" type="text" value={slug} onChange={(e) => setSlug(e.target.value)}/></label><br/>
                <label className="form-text">Image:<input className="form-input" type="file" onChange={handleImageChange}/>{imagePreview && <img className="form-input-image" src={imagePreview} alt="Preview"/>}</label><br/>
              <label className="form-text">Genre:<input className="form-input" type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/></label><br/>
            <label className="form-text">Pages:<input className="form-input" type="text" value={pages} onChange={(e) => setPages(e.target.value)}/></label><br/>
          <label className="form-text">Location:<input className="form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/></label><br/>
        <button className="form-button" type="submit">Create Book</button>
    </form>
  </div>
  );
};

export default CreateBookForm;

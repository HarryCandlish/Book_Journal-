// CreateBookForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createClient from '../client';

const CreateBookForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState(false);
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState(null); // Assuming you want to upload an image
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      _type: 'book',
      title,
      author,
      read,
      slug: {
        _type: 'slug',
        current: slug,
      },
      image,
      genre,
      pages,
      location,
    };

    try {
      const createdBook = await createClient.create(newBook);

      // Navigate to the new book's page
      navigate(`/book/${createdBook.slug.current}`);
    } catch (error) {
      console.error('Error creating a new book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Title:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
    <br />
    <label>
      Author:
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
    </label>
    <br />
    <label>
      Read:
      <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
    </label>
    <br />
    <label>
      Slug:
      <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
    </label>
    <br />
    <label>
      Image:
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
    </label>
    <br />
    <label>
      Genre:
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
    </label>
    <br />
    <label>
      Pages:
      <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} />
    </label>
    <br />
    <label>
      Location:
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
    </label>
    <br />
    <button type="submit">Create Book</button>
  </form>

  );
};

export default CreateBookForm;

// EditBookForm.jsx

import React, { useState, useEffect } from 'react';
import createClient from '../client';
import { useParams } from 'react-router-dom';

const EditBookForm = ({ onEdit }) => {
  const { slug } = useParams();
  const [bookData, setBookData] = useState({
    title: '',
    // Your book fields here
  });

  useEffect(() => {
    // Fetch book data by slug
    createClient
      .fetch(`*[_type == "book" && slug.current == $slug]`, { slug })
      .then((data) => {
        // Set the book data in the state
        setBookData(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  const handleInputChange = (e) => {
    // Handle input changes
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update book data
      await createClient
        .patch(bookData._id)
        .set(bookData)
        .commit();

      // Call the onEdit callback to inform the parent component
      onEdit();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form inputs with bookData values */}
      <label>
        Title:
        <input type="text" name="title" value={bookData.title} onChange={handleInputChange} />
      </label>
      {/* ... Other form inputs ... */}
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBookForm;

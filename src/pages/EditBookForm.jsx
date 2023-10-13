// EditBookForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import createClient from '../client';

const EditBookForm = () => {
  const { bookSlug } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    read: false,
    slug: '',
    image: null,
    genre: '',
    pages: '',
    location: '',
  });

  useEffect(() => {
    createClient
      .fetch(`*[_type == "book" && slug.current == $slug]`, { slug: bookSlug })
      .then((data) => {
        // Assuming data is an array with a single book
        const editedBook = data[0];
  
        // Update the state with the existing book details
        setBook({
          title: editedBook.title,
          author: editedBook.author,
          read: editedBook.read,
          slug: editedBook.slug.current,
          image: editedBook.image,
          genre: editedBook.genre,
          pages: editedBook.pages,
          location: editedBook.location,
        });
      })
      .catch(console.error);
  }, [bookSlug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Update the existing book in Sanity
    const updatedBook = await createClient
      .patch(`*[_type == "book" && slug.current == $slug]`, { slug: bookSlug })
      .set({
        title: book.title,
        author: book.author,
        read: book.read,
        // Do not include slug in the update
        image: book.image,
        genre: book.genre,
        pages: book.pages,
        location: book.location,
      })
      .commit();

    // Redirect to the book details page
    navigate(`/book/${updatedBook.slug.current}`);
  } catch (error) {
    console.error('Error updating the book:', error);
  }
};
  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={book.title} onChange={handleChange} placeholder={book.title} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" name="author" value={book.author} onChange={handleChange} placeholder={book.author} />
        </label>
        <br />
        <label>
          Read:
          <input type="checkbox" name="read" checked={book.read} onChange={handleChange} />
        </label>
        <br />
        <label>
          Slug:
          <input type="text" name="slug" value={book.slug} onChange={handleChange} placeholder={book.slug} />
        </label>
        <br />
        <label>
          Image:
          {/* Assuming you want to keep the existing image, you might want to display it here */}
          {book.image && book.image.asset && book.image.asset.url && (
            <img src={book.image.asset.url} alt="Current Image" style={{ width: '100px' }} />
          )}
          <input type="file" name="image" onChange={(e) => setBook({ ...book, image: e.target.files[0] })} />
        </label>
        <br />
        <label>
          Genre:
          <input type="text" name="genre" value={book.genre} onChange={handleChange} placeholder={book.genre} />
        </label>
        <br />
        <label>
          Pages:
          <input type="text" name="pages" value={book.pages} onChange={handleChange} placeholder={book.pages} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={book.location} onChange={handleChange} placeholder={book.location} />
        </label>
        <br />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookForm;

// EditBookForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import createClient from '../client';

const EditBookForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  console.log("Book ID:", bookId);


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
    .fetch(`*[_type == "book" && _id == $bookId]`, { bookId: bookId })
      .then((data) => {
         console.log(data);
        const editedBook = data[0];
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
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedBook = await createClient
      .patch(bookId) // Use the specific _id of the document
      .set({
        title: book.title,
        author: book.author,
        read: book.read,
        image: book.image,
        genre: book.genre,
        pages: book.pages,
        location: book.location,
      })
      .commit();

      navigate(`/book/${updatedBook.slug.current}`);
    } catch (error) {
      console.error('Error updating the book:', error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:<input type="text" name="title" value={book.title} onChange={handleChange}/></label><br/>
            <label>Author:<input type="text" name="author" value={book.author} onChange={handleChange}/></label><br/>
              <label>Read:<input type="checkbox" name="read" checked={book.read} onChange={handleChange}/></label><br/>
                <label>Slug:<input type="text" name="slug" value={book.slug} onChange={handleChange}/></label><br/>
                  <label>Image:{book.image && book.image.asset && book.image.asset.url && (
                    <img src={book.image.asset.url} alt="Current Image" style={{ width: '100px' }}/>)}
                      <input type="file" name="image" onChange={(e) => setBook({ ...book, image: e.target.files[0] })}/></label><br/>
                    <label>Genre:<input type="text" name="genre" value={book.genre} onChange={handleChange}/></label><br/>
                  <label>Pages:<input type="text" name="pages" value={book.pages} onChange={handleChange}/></label><br/>
                <label>Location:<input type="text" name="location" value={book.location} onChange={handleChange}/></label><br/>
              <button type="submit">Update Book</button>
            </form>
          </div>
  );
};

export default EditBookForm;

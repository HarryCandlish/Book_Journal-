import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { GoIssueClosed } from 'react-icons/go'
import { IoIosCloseCircleOutline } from 'react-icons/io'



import createClient from "../client.js";

import '../styles/booklist.css'

export default function BookList() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "book"]{
          _id,
          title,
          author,
          read,
          genre,
          location,
          slug,
          image{
            asset->{
            _id,
            url
          }
        }
      }`
      )
      .then((data) => setBooks(data))
      .catch(console.error);
  }, []);

  // Check for the new book ID in the URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newBookId = searchParams.get('newBookId');

  // If there's a new book ID, fetch and update the list of books
  useEffect(() => {
    if (newBookId) {
      createClient
        .fetch(`*[_type == "book" && _id == $newBookId]`, { newBookId })
        .then((newBook) => setBooks((prevBooks) => [...prevBooks, newBook]))
        .catch(console.error);
    }
  }, [newBookId]);

  const deleteBook = async (bookId) => {
    try {
      await createClient.delete(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting the book:', error);
    }
  };


return (
    <div>
      <table className='row-container'>
        <thead>
          <tr>
            <th></th>
              <th>TITLE</th>
                <th>AUTHOR</th>
              <th>READ</th>
          </tr>
        </thead>
          {books &&
            books.map((book, index) => (
              <tbody key={index} >
                <tr>
              <td> 
                <Link to={`/book/${book.slug && book.slug.current}`}>
                  {book.image && book.image.asset && book.image.asset.url ? (
                    <img className='book-image' src={book.image.asset.url} alt="image" />
                    ) : (
                    <span>No Image</span>
                    )}
                </Link>
              </td>
                <td className='book_title'>{book.title}</td>
                  <td>{book.author}</td>
                    <td>{book.read === true ? <GoIssueClosed/> : <IoIosCloseCircleOutline/>}</td>
                      <td>
                        <button><Link to={`/edit-book/${book._id}`}>Edit</Link></button>
                        <button onClick={() => deleteBook(book._id)}>Delete</button>
                    </td>
                  </tr>
              </tbody>
            ))}
          </table>
            <div>
              <div>
                <Link to='create-book'>Create Book</Link>
            </div>
          </div>
        </div>
  );
};

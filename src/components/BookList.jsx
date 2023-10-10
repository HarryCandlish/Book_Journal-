import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { GoIssueClosed } from 'react-icons/go'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import sanityClient from "../client.js";

import '../styles/booklist.css'

function BookList() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "book"]{
        title,
        author,
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
          <tbody>
            <tr>
            <td>
            <Link to={`/book/${book.slug}`}>
              <img
                className='book-image'
                src={book.image.asset.url}
                alt="image"/>
            </Link>
              </td>
                  <td className='book_title'>{book.title}</td>
                    <td>{book.author}</td>
                  <td>{book.read === true ? <IoIosCloseCircleOutline/> : <GoIssueClosed/>}</td>
              </tr>
            </tbody>
        ))}
      </table>
      <div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
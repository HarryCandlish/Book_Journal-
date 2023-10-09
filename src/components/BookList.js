import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'gde3k8c2',
  dataset: 'production',
  useCdn: true, // Set to false if you want to bypass the CDN for real-time data
});

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const query = '*[_type == "book"]';
        const result = await client.fetch(query);
        setBooks(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

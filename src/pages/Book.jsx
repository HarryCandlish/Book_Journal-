

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import createClient from "../client.js";

import '../styles/book.css'

export default function Book({}) {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const { slug } = useParams();

  const handleEdit = () => {
    navigate(`/edit-book/${book.slug.current}`);
  }

  useEffect(() => {
    createClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          author,
          image{
            asset->{
              _id,
              url
             }
           },
       }`,
        { slug }
      )
      .then((data) => setBook(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>{book.title}</h2>
        <div>
          <h4>{book.author}</h4>
        </div>
      </div>
      <img className="book_image" src={book.image.asset.url} alt="" />
      <div>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}
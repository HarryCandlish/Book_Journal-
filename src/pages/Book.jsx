// src/components/OnePost.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createClient from "../client.js";

export default function Book() {
  const [bookData, setBook] = useState(null);
  const { slug } = useParams();

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

  if (!bookData) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>{bookData.title}</h2>
        <div>
          <h4>{bookData.name}</h4>
        </div>
      </div>
      <img src={bookData.image.asset.url} alt="" />
      <div>
      </div>
    </div>
  );
}
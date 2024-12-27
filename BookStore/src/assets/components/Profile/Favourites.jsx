import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard';

function Favourites() {
  const [FavouriteBooks, setFavouriteBooks] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1010/api/favourite/getFavouriteBook", { headers });

        // Ensure the response is in the expected format
        if (response.data && response.data.data) {
          setFavouriteBooks(response.data.data);
        } else {
          setFavouriteBooks([]); // Fallback if no data found
        }
      } catch (err) {
        setError("Failed to fetch favourite books."); // Error handling
      } finally {
        setLoading(false); // Set loading to false after request
      }
    };
    fetch();
  }, [FavouriteBooks]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className='px-4 sm:px-8 md:px-12 py-8'>
      <h4 className='text-2xl sm:text-3xl lg:text-4xl text-yellow-100 text-center sm:text-left'>
        My Favourite Books
      </h4>
      <div className='mt-8'>
        {FavouriteBooks.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {FavouriteBooks.map((item, i) => (
              <div key={i}>
                <BookCard data={item} favourite={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-2xl text-center text-zinc-500'>
            No favourite books found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourites;

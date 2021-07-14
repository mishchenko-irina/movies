import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function Reviews({ movie }) {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    getMoviesReviews();
  }, [movie]);

  const getMoviesReviews = () => {
    fetch(
      `${baseUrl}/movie/${movie.id}/reviews?api_key=${apiKey}&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(reviews => {
        setReviews(reviews.results);
      });
  };

  const isReviewsFull = reviews.length > 0;

  return (
    <>
      <h2>Reviews</h2>
      {isReviewsFull ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews :(</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  movie: propTypes.object.isRequired,
};

import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import s from "./Cast.module.css";

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function Cast({ movie }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMoviesReviews();
  }, [movie]);

  const getMoviesReviews = () => {
    fetch(`${baseUrl}/movie/${movie.id}/credits?api_key=${apiKey}`)
      .then(res => res.json())
      .then(cast => {
        setCast(cast.cast);
      });
  };

  return (
    <>
      <ul className={s.list}>
        {cast &&
          cast.map(item => (
            <li key={item.id} className={s.listItem}>
              <p className={s.name}>{item.name}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.name}
                className={s.img}
              />
              <p>Character: {item.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

Cast.propTypes = {
  movie: propTypes.object.isRequired,
};

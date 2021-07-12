import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './HomePage.module.css';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = () => {
    fetch(`${baseUrl}/trending/movie/day?api_key=${apiKey}`)
      .then(res => res.json())
      .then(movies => {
        setMovies(movies.results);
      });
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Trending today</h2>
      <ul className={s.list}>
        {movies &&
          movies.map(movie => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className={s.listItem}
            >
              {movie.title}
            </Link>
          ))}
      </ul>
    </div>
  );
}

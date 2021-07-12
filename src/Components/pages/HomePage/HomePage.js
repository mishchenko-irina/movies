import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Trending today</h2>
      <ul>
        {movies &&
          movies.map(movie => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
            >
              {movie.title}
            </Link>
          ))}
      </ul>
    </div>
  );
}

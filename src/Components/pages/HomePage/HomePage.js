import { useState, useEffect } from 'react';

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
      <ul>{movies && movies.map(movie => <li>{movie.title}</li>)}</ul>
    </div>
  );
}

import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import s from './MoviesPage.module.css';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function MoviesPage() {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const handleInput = event => {
    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const btnClick = () => {
    history.push({ ...location, search: `query=${inputValue}` });

    getMoviesBySearchName();
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      alert('Enter the query!');
      return;
    }
  };

  const getMoviesBySearchName = () => {
    fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}&page=1&include_adult=false`,
    )
      .then(res => res.json())
      .then(movies => {
        setMovies(movies.results);
      });
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" onClick={btnClick} className={s.button}>
          <span>Search</span>
        </button>

        <input type="text" onChange={handleInput} className={s.input} />
      </form>

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

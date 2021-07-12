import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
      history.push({...location, search: `query=${inputValue}`})
  
      getMoviesBySearchName();
    }
  
    const handleSubmit = event => {
      event.preventDefault();
  
      if (inputValue.trim() === '') {
        alert('Enter the query!');
        return;
      }
    };
  
    const getMoviesBySearchName = () => {
      fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(movies => {
        setMovies(movies.results);
      });
    }
  
    return (
      <>
      <form onSubmit={handleSubmit}>
          <button type="submit" onClick={btnClick}>
            <span>Search</span>
          </button>
  
          <input
            type="text"
            onChange={handleInput}
          />
        </form>
  
        <ul>
        {movies &&
          movies.map(movie => (<li>{movie.title}</li>
          ))}
        </ul>
      </>
    );
  }
  
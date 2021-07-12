import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    getMovieFullInfo();
  }, [movieId]);

  const getMovieFullInfo = () => {
    fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(movie => {
        setMovie(movie);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

//   const history = useHistory();

//   const btnClick = () => {
//     history.goBack();
//   }

  const genres = movie.genres;

  return (
    <>
      {movie && (
        <div>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>User score: {movie.popularity}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {genres &&
              genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <hr />
        </div>
      )}
     
    </>
  );
}

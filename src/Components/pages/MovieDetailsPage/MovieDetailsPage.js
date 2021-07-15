import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
// import Cast from './../Cast/Cast';
// import Reviews from './../Reviews/Reviews';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('./../Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('./../Reviews/Reviews.js' /* webpackChunkName: "reviews" */),
);

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();

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

  const history = useHistory();

  const btnClick = () => {
    history.goBack();
  };

  const genres = movie.genres;

  return (
    <div className={s.container}>
      {movie && (
        <div>
          <button onClick={btnClick} className={s.button}>
            Go back
          </button>
          <div className={s.mainInfo}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={s.img}
              />
            </div>
            <h1 className={s.title}>{movie.title}</h1>
            <span>
              <p>User score: {movie.popularity}</p>

              <h3>Overview</h3>
              <p>{movie.overview}</p>

              <h3>Genres</h3>
              <ul>
                {genres &&
                  genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
              </ul>
            </span>
          </div>
          <hr />
        </div>
      )}
      <h2>Additional information</h2>
      <ul>
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>
      <hr />

      <Suspense
        fallback={
          <Loader
            type="Rings"
            color="#000000"
            height={50}
            width={50}
            timeout={3000}
          />
        }
      >
        <Route path={`${url}/cast`}>{movie && <Cast movie={movie} />}</Route>

        <Route path={`${url}/reviews`}>
          {movie && <Reviews movie={movie} />}
        </Route>
      </Suspense>
    </div>
  );
}

import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  
const location = useLocation;
const backLinkHref = useRef(location.state?.from || "/")
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError('Film detayları alınamadı.');
      }
    }

    getMovie();
  }, [movieId]);

  if (error) return <p className={styles.message}>{error}</p>;
  if (!movie) return <p className={styles.message}>Loading...</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className={styles.container}>
      <Link className={styles.back} to={backLinkHref.current}>Go Back</Link>
      <h1 className={styles.title}>{movie.title}</h1>

      <div className={styles.details}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.poster}
        />

        <div className={styles.info}>
          <p><strong>Overview :</strong> {movie.overview}</p>
          <p><strong>Release Date :</strong> {movie.release_date}</p>
          <p><strong>Vote Average :</strong> {movie.vote_average} / 10</p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map(genre => genre.name).join(', ')
              : 'Bilgi yok'}
          </p>
        </div>
      </div>

      <hr className={styles.divider} />
      <h2 className={styles.subtitle}>Additional İnformation</h2>
      <ul className={styles.linkList}>
        <li><Link className={styles.link} to="cast">Cast</Link></li>
        <li><Link className={styles.link} to="reviews">Reviews</Link></li>
      </ul>

      <hr className={styles.divider} />
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;

import { Link, useLocation } from 'react-router-dom';
import styles from './MovieCard.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

function MovieCard({ movie }) {
  const location = useLocation();

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const title = movie.title || movie.name;

  return (
    <li className={styles.card}>
      <Link
        to={`/movies/${movie.id}`}
        state={{ from: location }}
        className={styles.link}
      >
        <img src={poster} alt={title} className={styles.image} />
        <h3 className={styles.title}>{title}</h3>
      </Link>
    </li>
  );
}

export default MovieCard;

import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css'; 

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError('Failed to load cast.');
      }
    }

    fetchCast();
  }, [movieId]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!cast.length) return <p className={styles.noData}>No cast info avaliable.</p>;

  return (
    <ul className={styles.list}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id} className={styles.item}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={name}
            className={styles.image}
          />
          <div className={styles.info}>
            <p className={styles.name}><strong>{name}</strong></p>
            <p className={styles.character}>Character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default MovieCast;

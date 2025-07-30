import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../services/api.js';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError('Yorumlar yüklenemedi.');
        setReviews([]);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (error) return <p className={styles.message}>{error}</p>;
  if (!reviews.length) return <p className={styles.message}>Bu film için yorum bulunamadı.</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.item}>
          <p className={styles.author}><strong>{author}</strong> :</p>
          <p className={styles.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;

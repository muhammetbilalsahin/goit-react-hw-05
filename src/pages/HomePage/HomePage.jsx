import { useEffect, useState } from 'react';
import { fetchTrending } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList.jsx';
import styles from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTrendingMovies() {
      try {
        setLoading(true);
        const results = await fetchTrending();
        setMovies(results);
      } catch {
        setError('Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    loadTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>

      {loading && <p className={styles.message}>Loading...</p>}
      {error && <p className={styles.message}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';  

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (!currentQuery) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const results = await searchMovies(currentQuery);
        setMovies(results);
      } catch {
        setError('Arama başarısız.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ query: query.trim() });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOVİES SEARCH</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;

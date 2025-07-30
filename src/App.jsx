import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation.jsx";


const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const Cast = lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const Reviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<p style={{  display:"flex", justifyContent:"center", fontSize:"55px"  }}>404 - Page not found</p>} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import MovieReviews from './components/MovieReviews/MovieReviews.jsx';

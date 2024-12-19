import "./App.css";
import searchIcon from "../icons/search.png";
import houseIcon from "../icons/home.png";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  const fetchMovies = () => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then(setMovies)
      .catch((error) => setError(error.message));
  };

  const changeVoteMovie = (id, direction) => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: `${id}`,
        vote_direction: `${direction}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to change vote on movies");
        }
        return response.json();
      })
      .then((updatedMovie) => {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === id) {
            return updatedMovie;
          }
          return movie;
        });
        setMovies(updatedMovies);
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (error) {
    return (
      <main className="App">
        <header>
          <h1>rancid tomatillos</h1>
        </header>
        <div className="error-message">{error}</div>
      </main>
    );
  }
  return (
    <main className="App">
      <header>
        <h1>rancid tomatillos</h1>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <MoviesContainer
              moviePosters={movies}
              onVote={changeVoteMovie}
            />
          }
        />
        <Route
          path="/:movieId"
          element={
            <MovieDetails
              houseIcon={houseIcon}
            />
          }
        />
        <Route path="*" element={<h2>404-This page doesn't exist</h2>} />
      </Routes>

    </main>
  );
}

export default App;

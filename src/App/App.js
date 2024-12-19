import "./App.css";
import searchIcon from "../icons/search.png";
import houseIcon from "../icons/home.png";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
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
  // const fetchMovieDetails = (id) => {
  //   fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`)
  //     .then((response) => response.json())
  //     .then(setSelectedMovie)
  //     .catch((error) => console.log(error.message));
  // };

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

  // const showMovieDetails = (id) => {
  //   fetchMovieDetails(id);
  // };

  // const showAllMovies = () => {
  //   setSelectedMovie(null);
  // };

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
              // onSelectedPoster={showMovieDetails}
            />
          }
        />
        <Route
          path="/:movieId"
          element={
            <MovieDetails
              // title={selectedMovie.title}
              // image={selectedMovie.backdrop_path}
              // genres={selectedMovie.genre_ids}
              // overview={selectedMovie.overview}
              // onHomeButton={showAllMovies}
              houseIcon={houseIcon}
            />
          }
        />
        <Route path="*" element={<h2>404-This page doesn't exist</h2>} />
      </Routes>
      {/* {!selectedMovie && (
        <MoviesContainer
          moviePosters={movies}
          onVote={changeVoteMovie}
          onSelectedPoster={showMovieDetails}
        />
      )}
      {selectedMovie && (
        <MovieDetails
          title={selectedMovie.title}
          image={selectedMovie.backdrop_path}
          genres={selectedMovie.genre_ids}
          overview={selectedMovie.overview}
          onHomeButton={showAllMovies}
          houseIcon={houseIcon}
        />
      )} */}
    </main>
  );
}

export default App;

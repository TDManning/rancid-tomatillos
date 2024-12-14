import "./App.css";
import searchIcon from "../icons/search.png";
import houseIcon from "../icons/home.png";

// Example imports (for later):
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]); //remove the hard coded moviePosters
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = () => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
    .then((response) => response.json())
    .then(setSelectedMovie) //update selectedMovie state with fetched data
  }

  const fetchMovieDetails = (id) => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies${id}`)
      .then((response) => response.json())
      .then(setSelectedMovie)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const showMovieDetails = (id) => {
    fetchMovieDetails(id)
  };

  const showAllMovies = () => {
    setSelectedMovie(null);
  };

  const handleUpvote = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, vote_count: movie.vote_count + 1 };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const handleDownvote = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, vote_count: Math.max(0, movie.vote_count - 1) };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };
  return (
    <main className="App">
      <header>
        <h1>rancid tomatillos</h1>
      </header>
      {!selectedMovie && (
        <MoviesContainer
          moviePosters={movies}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
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
      )}
    </main>
  );
}

export default App;

import "./App.css";
import searchIcon from "../icons/search.png";
import houseIcon from "../icons/home.png";

// Example imports (for later):
import { useState, useEffect } from "react";
import moviePosters from "../data/movie_posters";
import movieDetails from "../data/movie_details";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";

function App() {
  const [movies, setMovies] = useState(moviePosters);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showMovieDetails = (id) => {
    console.log("testing", id);
    //below is hardcoded, for the actual part where we are calling an API we would likely need to do something similar to how you handled upvote/downvote
    setSelectedMovie(movieDetails);
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

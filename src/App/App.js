import "./App.css";
import searchIcon from "../icons/search.png";
import houseIcon from "../icons/home.png";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = () => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
      .then((response) => response.json())
      .then(setMovies);
  };

  const fetchMovieDetails = (id) => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`)
      .then((response) => response.json())
      .then(setSelectedMovie);
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
      .then((response) => response.json())
      .then((updatedMovie) => {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === id) {
            return updatedMovie;
          }
          return movie;
        });
        setMovies(updatedMovies);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const showMovieDetails = (id) => {
    fetchMovieDetails(id);
  };

  const showAllMovies = () => {
    setSelectedMovie(null);
  };

  return (
    <main className="App">
      <header>
        <h1>rancid tomatillos</h1>
      </header>
      {!selectedMovie && (
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
      )}
    </main>
  );
}

export default App;

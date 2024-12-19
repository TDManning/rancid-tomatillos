import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams, Link } from "react-router-dom";

function MovieDetails({
  // title,
  // image,
  // genres,
  // overview,
  // onHomeButton,
  houseIcon,
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const id = useParams().movieId;
  const fetchMovieDetails = () => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`)
      .then((response) => {
        if (response.status === 500) {
          throw new Error(
            "Failed to fetch movie details due to a server error"
          );
        } else if (response.status === 404) {
          throw new Error("Bad request. This page doesn't exist.");
        }
        return response.json();
      })
      .then(setSelectedMovie)
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const genreList = (genres) => {
    console.log(genres);
    return genres.map((genre, index) => {
      return (
        <div key={index} className="genre-items">
          {genre}
        </div>
      );
    });
  };

  return (
    <>
      <Link to={`/`}>
        <img src={houseIcon} alt="Back to home page" className="home-button" />
      </Link>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        selectedMovie && (
          <section className="MovieDetails">
            <img
              src={selectedMovie.backdrop_path}
              alt={selectedMovie.title}
              className="movie-image"
            />
            <h2 className="title">{selectedMovie.title}</h2>
            <div className="genres">{genreList(selectedMovie.genre_ids)}</div>
            <p>{selectedMovie.overview}</p>
          </section>
        )
      )}
    </>
  );
}
export default MovieDetails;

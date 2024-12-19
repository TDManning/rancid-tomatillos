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

  const id = useParams().movieId;
  const fetchMovieDetails = () => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`)
      .then((response) => response.json())
      .then(setSelectedMovie)
      .catch((error) => console.log(error.message));
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
    selectedMovie && (
      <>
        <Link to={`/`}>
          <img
            src={houseIcon}
            alt="Back to home page"
            className="home-button"
          />
        </Link>
        <section className="MovieDetails">
          <img
            src={selectedMovie.poster_path}
            alt={selectedMovie.title}
            className="movie-image"
          />
          <h2 className="title">{selectedMovie.title}</h2>
          <div className="genres">{genreList(selectedMovie.genre_ids)}</div>
          <p>{selectedMovie.overview}</p>
        </section>
      </>
    )
  );
}

export default MovieDetails;

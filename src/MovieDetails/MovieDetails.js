import React from "react";
import "./MovieDetails.css";

function MovieDetails({
  title,
  image,
  genres,
  overview,
  onHomeButton,
  houseIcon,
}) {
  console.log("image", { image });
  const genreList = genres.map((genre) => {
    return <div className="genre-items">{genre}</div>;
  });

  return (
    <>
      <img
        src={houseIcon}
        alt="Back to home page"
        onClick={() => onHomeButton()}
        className="home-button"
      />
      <section className="MovieDetails">
        <img src={image} alt={title} className="movie-image" />
        <h2 className="title">{title}</h2>
        <div className="genres">{genreList}</div>
        <p>{overview}</p>
      </section>
    </>
  );
}

export default MovieDetails;

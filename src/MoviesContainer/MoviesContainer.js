import React from "react";
import MoviePoster from "../MoviePoster/MoviePoster";
import "./MoviesContainer.css";

function Movies({ moviePosters, onSelectedPoster, onVote }) {
  const moviePosterInfo = moviePosters.map((moviePoster) => {
    return (
      <MoviePoster
        id={moviePoster.id}
        key={moviePoster.id}
        title={moviePoster.title}
        posterPath={moviePoster.poster_path}
        voteCount={moviePoster.vote_count}
        onVote={onVote}
        onSelectedPoster={onSelectedPoster}
      />
    );
  });

  return <section className="MoviesContainer">{moviePosterInfo}</section>;
}

export default Movies;

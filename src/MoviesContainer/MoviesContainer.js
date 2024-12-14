import React from "react";
import MoviePoster from "../MoviePoster/MoviePoster";
import "./MoviesContainer.css";

function Movies({ moviePosters, onUpvote, onDownvote, onSelectedPoster }) {
  const moviePosterInfo = moviePosters.map((moviePoster) => {
    return (
      <MoviePoster
        id={moviePoster.id}
        key={moviePoster.id}
        title={moviePoster.title}
        posterPath={moviePoster.poster_path}
        voteCount={moviePoster.vote_count}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        onSelectedPoster={onSelectedPoster}
      />
    );
  });

  return <section className="MoviesContainer">{moviePosterInfo}</section>;
}

export default Movies;

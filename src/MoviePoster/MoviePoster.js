import React from "react";
import "./MoviePoster.css";

function MoviePoster({
  id,
  title,
  posterPath,
  voteCount,
  onVote,
  onSelectedPoster,
}) {
  return (
    <section className="MoviePoster">
      <img
        src={posterPath}
        alt={title}
        className="poster-image"
        onClick={() => onSelectedPoster(id)}
      />
      <div className="vote-section">
        <button onClick={() => onVote(id, "up")} className="vote-button">
          ⬆
        </button>
        <span>{voteCount}</span>
        <button onClick={() => onVote(id, "down")} className="vote-button">
          ⬇
        </button>
      </div>
    </section>
  );
}

export default MoviePoster;

import React from "react";
import "./MoviePoster.css";
import { Link } from "react-router-dom";
function MoviePoster({
  id,
  title,
  posterPath,
  voteCount,
  onVote,
}) {
  return (
    <section className="MoviePoster">
      <Link to={`/${id}`}>
        <img
          src={posterPath}
          alt={title}
          className="poster-image"
        />
      </Link>
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

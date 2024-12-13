import React from 'react';
import './MoviePoster.css';

function MoviePoster({id, title, posterPath, voteCount, onUpvote, onDownvote }) {
  return (
    <section className='MoviePoster'>
      <img src={posterPath} alt={title} className="poster-image"/>
      <div className="vote-section"> 
        <button onClick={ () => onUpvote(id)} className="vote-button">⬆</button>
        <span>{voteCount}</span>
        <button onClick={ () => onDownvote(id)} className="vote-button">⬇</button>
      </div>
    </section>
  );
}

export default MoviePoster;
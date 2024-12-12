import React from 'react';
import './MoviePoster.css';

function MoviePoster({title,posterPath, voteCount}) {
  return (
    <section className='MoviePoster'>
      <img src={posterPath} alt={title} className="poster-image"/>
      <div>{voteCount}</div>
    </section>
  );
}

export default MoviePoster;
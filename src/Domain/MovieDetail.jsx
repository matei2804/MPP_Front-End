import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8080/movie?id=${movieId}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieId]); 

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const { title, genre, year_of_release, trailer_link, photo } = movie;
  const youtubeId = trailer_link ? new URL(trailer_link).searchParams.get('v') : '';

  return (
    <div>
      <h3>{title}</h3>
      <img src={photo} width="130" height="200" alt={title} />
      <p>Genre: {genre}</p>
      <p>Year of release: {year_of_release}</p>
      {youtubeId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      )}
    </div>
  );
};

export default MovieDetail;

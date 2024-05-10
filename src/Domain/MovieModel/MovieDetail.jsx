import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, updateMovie } from '../../redux/movieSlicer';

const MovieDetail = () => {
  const { movieId } = useParams();

  const dispatch = useDispatch();
    const { movie, isLoading, error } = useSelector(state => state.movieStore);

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);


  if (!movie) {
    return <div>Movie not found</div>;
  }

  const { title, genre, yearOfRelease, trailerLink, photo } = movie;
  const youtubeId = trailerLink ? new URL(trailerLink).searchParams.get('v') : '';

  return (
    <div>
      <h3>{title}</h3>
      <img src={photo} width="130" height="200" alt={title} />
      <p>Genre: {genre}</p>
      <p>Year of release: {yearOfRelease}</p>
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

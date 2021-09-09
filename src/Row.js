import axios from "./axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); // this state will capture the url , when we click the thumbnail of the poster

  const base_url = "https://image.tmdb.org/t/p/original";
  //const base_url = "https://image.tmdb.org/t/p/w500/" ;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  //Line 30, 31 for fixing dead link

  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(" "); //if trailer is already open, it will hide/close video if u click it
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
            //https://www.youtube.com/watch?v=XtMThy8QKqU
                                //v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          //urlParams.get('v'); in this example url above
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => {
          alert('Temporarily unavailable');
      });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

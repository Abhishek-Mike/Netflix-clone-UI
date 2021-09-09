import axios from "./axios";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import requests from "./Requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  //search movie
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); // this state will capture the url , when we click the thumbnail of the poster

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);

  console.log(movie);
  
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(''); //if trailer is already open, it will hide/close video if u click it
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

  // truncate movie description greater tha 150 words and trim ab
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button onClick={() => handleClick(movie)} className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </header>
  );
}

export default Banner;

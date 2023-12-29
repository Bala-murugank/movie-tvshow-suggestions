import React, { useEffect, useState } from "react";
import "./movies.css";

import axios from "axios";

import { img_300, unavailable } from "../../Config/config";
import Pagination from "../Pagination/Pagination";
import useGenres from "../hooks/useGenres";
import Genres from "../Genres/Genres";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MovieShowDetailsModel from "../MovieShowDetailsModel/MovieShowDetailsModel";
export const movieGeners = React.createContext();

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [noOfPage, setNoOfPage] = useState();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setNoOfPage(res.data.total_pages);
      });
  }, [page, genreforURL]);

  return (
    <div className="movie_section">
      <>
        <span className="pageTitle">MOVIES TODAY</span>
      </>
      <>
        <Genres
          genres={genres}
          selectedGenres={selectedGenres}
          setGenres={setGenres}
          setSelectedGenres={setSelectedGenres}
          media_type={"movie"}
        />
      </>
      <>
        <div className="movies">
          {movies.map((movieList) => (
            <MovieShowDetailsModel
              key={movieList.id}
              style={{ height: 500, width: 320 }}
              className="movieList"
              id={movieList.id}
              media_type={"movie"}
            >
              <span className="NoteBadge">
                <CircularProgressbar
                  value={Math.floor(movieList.vote_average)}
                  circleRatio={10}
                  text={Math.floor(movieList.vote_average) + "0%"}
                  styles={{
                    root: {},
                    path: {
                      stroke:
                        Math.floor(movieList.vote_average) === 0
                          ? "rgb(218,32,46)"
                          : Math.floor(movieList.vote_average) >= 7
                          ? "rgb(90,219,82)"
                          : "rgb(219,200,82)",
                      strokeLinecap: "round",
                    },
                    trail: {
                      stroke: "black",
                    },
                    text: {
                      fontSize: "30px",
                      fill: "black",
                    },
                  }}
                />
              </span>
              <div>
                <img
                  style={{ height: 350, width: 320, objectFit: "fill" }}
                  src={
                    movieList.backdrop_path
                      ? `${img_300}${movieList.backdrop_path}`
                      : `${unavailable}`
                  }
                  alt={`${movieList.title || movieList.name}`}
                />

                {/* <span className='e-badge'>{trendingToday.vote_average}</span> */}
              </div>
              {/* <Badge className="badge">9</Badge> */}

              <div style={{ height: 140, width: 320 }} className="movie_name">
                <div>
                  <span className="movie_title">
                    {movieList.title || movieList.name}
                  </span>
                </div>
                <div className="movie_type_data">
                  <span>Movie</span>
                  <span>
                    {movieList.release_date
                      ? movieList.release_date
                      : movieList.first_air_date}
                  </span>
                </div>
              </div>
            </MovieShowDetailsModel>
          ))}
        </div>
      </>
      <>{noOfPage > 1 && <Pagination page={page} setPage={setPage} />}</>
    </div>
  );
};

export default Movies;

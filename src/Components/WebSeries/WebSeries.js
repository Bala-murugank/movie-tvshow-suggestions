import React, { useState, useEffect } from "react";
import axios from "axios";

import { img_300, unavailable } from "../../Config/config";
import Pagination from "../Pagination/Pagination";
import useGenres from "../hooks/useGenres";
import Genres from "../Genres/Genres";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MovieShowDetailsModel from "../MovieShowDetailsModel/MovieShowDetailsModel";
export const tvSeriesData = React.createContext();

const WebSeries = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [noOfPage, setNoOfPage] = useState();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setNoOfPage(res.data.total_pages);
      });
  }, [page, genreforURL]);
  return (
    <div className="movie_section">
      <>
        <span className="pageTitle">TV SERIES TODAY</span>
      </>
      <>
        <Genres
          genres={genres}
          selectedGenres={selectedGenres}
          setGenres={setGenres}
          setSelectedGenres={setSelectedGenres}
          media_type={"tv"}
        />
      </>
      <>
        <div className="movies">
          {movies.map((seriesList) => (
            <MovieShowDetailsModel
              key={seriesList.id}
              className="movieList"
              id={seriesList.id}
              media_type={"tv"}
            >
              <span className="NoteBadge">
                <CircularProgressbar
                  value={Math.floor(seriesList.vote_average)}
                  circleRatio={10}
                  text={Math.floor(seriesList.vote_average) + "0%"}
                  styles={{
                    root: {},
                    path: {
                      stroke:
                        Math.floor(seriesList.vote_average) === 0
                          ? "rgb(218,32,46)"
                          : Math.floor(seriesList.vote_average) >= 7
                          ? "rgb(90,219,82)"
                          : "rgb(219,200,82)",
                      strokeLinecap: "round",
                    },
                    trail: {
                      stroke: "black",
                    },
                    text: {
                      fontSize: "30px",
                      fill: "white",
                    },
                  }}
                />
              </span>
              <div>
                <img
                  style={{ height: 250, width: 220, objectFit: "fill" }}
                  src={
                    seriesList.backdrop_path
                      ? `${img_300}${seriesList.backdrop_path}`
                      : `${unavailable}`
                  }
                  alt={`${seriesList.title || seriesList.name}`}
                />
              </div>

              <div className="movie_name">
                <div>
                  <span className="movie_title">
                    {seriesList.title || seriesList.name}
                  </span>
                </div>
                <div className="movie_type_data">
                  <span>TV Show</span>
                  <span>
                    {seriesList.release_date
                      ? seriesList.release_date
                      : seriesList.first_air_date}
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

export default WebSeries;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { img_300, unavailable } from "../../Config/config";
import "./trendingToday.css";

import Pagination from "../Pagination/Pagination";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MovieShowDetailsModel from "../MovieShowDetailsModel/MovieShowDetailsModel";

const TrendingToday = () => {
  const [trendingToday, setTrendingToday] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      .then((res) => {
        setTrendingToday(res.data.results);
      })
      .catch((error) => console.log(error.message));
  }, [page]);

  return (
    <>
      <div className="app_trending_today">
        <span className="pageTitle">TRENDING TODAY</span>
        <div className="TrendingToday">
          {trendingToday.map((trendingToday) => (
            <MovieShowDetailsModel
              key={trendingToday.id}
              style={{ height: 500, width: 320 }}
              className="TrendingTodayList"
              id={trendingToday.id}
              media_type={trendingToday.media_type}
            >
              <span className="NoteBadge">
                <CircularProgressbar
                  value={Math.floor(trendingToday.vote_average)}
                  circleRatio={10}
                  text={Math.floor(trendingToday.vote_average) + "0%"}
                  styles={{
                    root: {},
                    path: {
                      stroke:
                        Math.floor(trendingToday.vote_average) > 6
                          ? "rgb(90,219,82)"
                          : "rgb(219,200,82)",
                      strokeLinecap: "round",
                    },
                    trail: {
                      stroke: "black",
                    },
                    text: {
                      fontSize: "30px",
                      fill: 'white',
                      
                    },
                  }}
                />
              </span>
              <div>
                <img
                className="poster"
                  style={{ height: 350, width: 320, objectFit: "fill" }}
                  src={
                    trendingToday.poster_path

                      ? `${img_300}${trendingToday.poster_path
}`
                      : `${unavailable}`
                  }
                  alt={`${trendingToday.title || trendingToday.name}`}
                />
              </div>

              <div
                style={{ height: 140, width: 320 }}
                className="TrendingTodayList-name"
              >
                <div>
                  <span className="trendingMovieSeriesName">
                    {trendingToday.title || trendingToday.name}
                  </span>
                </div>
                <div className="TrendingTodayList-type-data">
                  <span>
                    {trendingToday.media_type === "movie" ? "Movie" : "TV Show"}
                  </span>
                  <span>
                    {trendingToday.release_date
                      ? trendingToday.release_date
                      : trendingToday.first_air_date}
                  </span>
                </div>
              </div>
            </MovieShowDetailsModel>
          ))}
        </div>

        {trendingToday.length > 0 && (
          <Pagination page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
};

export default TrendingToday;

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { img_300, unavailable } from "../../Config/config";
import axios from "axios";
import "./search.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import MovieShowDetailsModel from "../MovieShowDetailsModel/MovieShowDetailsModel";

const Search = () => {
  const [type, setType] = useState('movie');

  const [seachQurey, setSearchQuary] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [page] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/${
          type === "tv" ? "tv" : "movie"
        }?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${
          seachQurey && seachQurey
        }&page=${page}&include_adult=false`
      )
      .then((res) => {
        
        setSearchData(res.data.results);
      });
  }, [type, seachQurey,page]);

  return (
    <div className="search_section">
      <Form.Control
        size="lg"
        type="text"
        placeholder="seach movie or tv show"
        style={{ width: 400 }}
        onChange={(event) => {
          setSearchQuary(event.target.value);
          
        }}
      />

      <>
        <Tabs
          activeKey={type}
          onSelect={(k) => setType(k)}
          style={{ marginTop: 15, width: "60%" }}
          justify
        >
          <Tab eventKey="movie" title="MOVIES" />

          <Tab eventKey="tv" title="TV SHOWES" />
        </Tabs>
      </>
      <>
        {searchData.length < 1 ? (
          <h2 style={{ color: "red" }}>No Search Item...</h2>
        ) : (
          <div className="search">
            {searchData?.map((searchItem) => (
              <MovieShowDetailsModel
                key={searchItem.id}
                style={{ height: 500, width: 320 }}
                className="searchItem"
                id={searchItem.id}
              media_type={type}
              >
                 <span className="NoteBadge">
                <CircularProgressbar  value={Math.floor(searchItem.vote_average)}  circleRatio={10} text={Math.floor(searchItem.vote_average)+ "0%"}
                styles={{
                  root : {},
                  path :{
                    stroke: Math.floor(searchItem.vote_average) === 0 ?  'rgb(218,32,46)' :  Math.floor(searchItem.vote_average) >=  7 ?  'rgb(90,219,82)' : 'rgb(219,200,82)',
                    strokeLinecap: 'round',
                  },
                  trail :{
                    stroke: "black"
                  },
                   text :{
                     fontSize : '30px',
                     fill : 'black'
                   },
                 
                }}/>
              </span> 

                <div>
                  <img
                    style={{ height: 350, width: 320, objectFit: "fill" }}
                    src={
                      searchItem.backdrop_path
                        ? `${img_300}${searchItem.backdrop_path}`
                        : `${unavailable}`
                    }
                    alt={`${searchItem.title || searchItem.name}`}
                  />

                 
                </div>
               
                <div
                  style={{ height: 140, width: 320 }}
                  className="search_movie_tv_name"
                >
                  <div>
                    <span className="search_movie_tv_title">
                      {searchItem.title || searchItem.name}
                    </span>
                  </div>
                  <div className="search_movie_tv_type_data">
                    <span>{type === "movie" ? "Movie" : "TV Show"}</span>
                    <span>
                      {searchItem.release_date
                        ? searchItem.release_date
                        : searchItem.first_air_date}
                    </span>
                  </div>
                </div>
              </MovieShowDetailsModel>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default Search;

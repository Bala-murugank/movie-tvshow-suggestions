import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./movieShowModel.css";
import axios from "axios";
import ModelContent from "./ModelContent";

const MovieShowDetailsModel = ({ children, id, media_type }) => {
  const [lgShow, setLgShow] = useState(false);

  const [movieShowModelTrailer, setMovieShowModelTrailer] = useState([]);
  const [movieShowDetailsData, setMovieShowDetailsData] = useState({});

  const fetchMovieShowVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    data.results.length <= 1
      ? setMovieShowModelTrailer(data.results)
      : setMovieShowModelTrailer(
          data.results.filter(
            (data) =>
              data.name === "Official Trailer" ||
              data.name === "Main Trailer" ||
              data.name === "Trailer" ||
              data.name === "Official Trailer [Subtitled]"
          )
        );
  };

  const fetchMovieShowDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setMovieShowDetailsData(data);
  };

  useEffect(() => {
    if (lgShow) {
      fetchMovieShowDetails();
      fetchMovieShowVideo();
    }
    // eslint-disable-next-line
  }, [lgShow]);
  return (
    <>
      <Button onClick={() => setLgShow(true)} className="movieShowModel">
        {children}
      </Button>

      <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)}>
        <Modal.Header closeButton>
          <h2> {media_type === "tv" ? "TV Show Details" : "Movie Details"}</h2>
        </Modal.Header>
        <Modal.Body className="modelContent">
          {movieShowModelTrailer && (
            <ModelContent
              movieShowDetailsData={movieShowDetailsData}
              movieShowModelTrailer={movieShowModelTrailer}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieShowDetailsModel;

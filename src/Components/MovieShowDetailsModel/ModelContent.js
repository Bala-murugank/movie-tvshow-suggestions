import React from "react";
import Button from "react-bootstrap/esm/Button";
import { FaYoutube } from "react-icons/fa";
import { img_500, unavailable } from "../../Config/config";
import "./modelContent.css";

const ModelContent = ({ movieShowModelTrailer, movieShowDetailsData }) => {
  return (
    <>
      <div className="model_img_section">
        <img
          className="movie_show_model_img"
          src={
            movieShowDetailsData.backdrop_path
              ? `${img_500}/${movieShowDetailsData.backdrop_path}`
              : unavailable
          }
          alt={movieShowDetailsData.original_titile}
        />
      </div>

      <div className="model_details_section">
        <div className="model_name_tagline_data_section">
          <div>
            <span>
              {movieShowDetailsData.title
                ? movieShowDetailsData.title
                : movieShowDetailsData.original_title ||
                  movieShowDetailsData.original_name}
            </span>
            <span>
              (
              {(
                movieShowDetailsData.release_date ||
                movieShowDetailsData.first_air_date ||
                "_____"
              ).slice(0, 4)}
              )
            </span>
          </div>
          <div>
            <span>{movieShowDetailsData.tagline}</span>
          </div>

          <div className="model_description_section">
            <span className="model_description">
              {movieShowDetailsData.overview}
            </span>
          </div>
        </div>

       <div className='trailerButton'>
        {
             <Button disabled={movieShowModelTrailer.length < 1 && true}  variant='danger' href={`https://www.youtube.com/watch?v=${movieShowModelTrailer[0]?.key}`} target='blank'  >
                    <span>
                        <FaYoutube style={{width: 30,height:30}}/>
                    </span>
                    <span>
                        {movieShowModelTrailer.length < 1 ? "No Trailer" : "Watch Trailer"}
                    </span>
                   
            </Button>

           
        }
       </div>
      </div>

      
    </>
  );
};

export default ModelContent;

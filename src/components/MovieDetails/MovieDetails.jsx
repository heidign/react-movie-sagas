import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";

function MovieDetails() {
  const history = useHistory();
  // * getting id key from path params
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);
  const loadingDetails = useSelector((store) => store.movieDetails.loading);


  useEffect(() => {
    console.log("id:", id);
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);

  const goBack = () => {
    history.goBack("/");
    clearDetails();
  };

  const clearDetails = () => {
    dispatch({ type: 'CLEAR_ALL_DETAILS'});
  }

  return (
    <div>
      <h2>Movie Details: {movieDetails.title}</h2>
      {loadingDetails ? (
        <ClipLoader />
      ) : (
        <>
          <img src={movieDetails.poster} />
          <p>{movieDetails.description}</p>
          <Button variant="contained" onClick={goBack}>
            Back
          </Button>
        </>
      )}
    </div>
  );
}

export default MovieDetails;

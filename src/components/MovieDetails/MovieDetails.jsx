import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@mui/material";

function MovieDetails() {
  const history = useHistory();
  // * getting id key from path params
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);

  useEffect(() => {
    console.log("id:", id);
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);

  const goBack = () => {
    history.goBack("/");
  };

  return (
    <div>
      <h2>Movie Details: {movieDetails.title}</h2>
          <img src={movieDetails.poster} />
          {/* {JSON.stringify(movieDetails)} */}
          <p>{movieDetails.description}</p>
      <Button variant="contained" onClick={goBack}>Back</Button>
    </div>
  );
}

export default MovieDetails;

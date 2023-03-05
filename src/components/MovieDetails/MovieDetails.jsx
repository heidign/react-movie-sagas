import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";
import EditDetails from "../EditDetails/EditDetails";

function MovieDetails() {

  const history = useHistory();
  // * getting id key from path params
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);
  const loadingDetails = useSelector((store) => store.movieDetails.loading);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log("id:", id);
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);

  const goBack = () => {
    history.goBack("/");
    clearDetails();
  };

  // * clearing details before new movie's details have loaded
  const clearDetails = () => {
    dispatch({ type: "CLEAR_ALL_DETAILS" });
  };

  const handleEditing = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <>

        {loadingDetails ? (
          <ClipLoader />
        ) : (
            <>
              {edit ?
                <EditDetails movieDetails={movieDetails} handleEditing={handleEditing} clearDetails={clearDetails} /> : <>
            <Button variant="contained" onClick={handleEditing}>
              Edit
            </Button>
            <h2>Movie Details: {movieDetails.title}</h2>
            <img src={movieDetails.poster} />
            <p> {movieDetails.description}</p>
            <Button variant="contained" onClick={goBack}>
              Back
              </Button> </>
              }

          </>
        )}
      </>
    </div>
  );
}

export default MovieDetails;

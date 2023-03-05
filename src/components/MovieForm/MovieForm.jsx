import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";

function MovieForm() {
  const genres = useSelector((store) => store.genres.genres);
  const loadingGenres = useSelector((store) => store.genres.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const [input, setInput] = useState({
    title: "",
    description: "",
    poster: "",
    genre_id: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form validation
    console.log("input:", input);

    dispatch({
      type: "SUBMIT_MOVIE",
      payload: input,
    });
    history.push("/");
    clearInput();
  };

  const cancelSubmit = () => {
    history.push("/");
  };

  const handleChange = (e, key) => {
    setInput({ ...input, [key]: e.target.value });
  };

  const clearInput = () => {
    setInput({
      title: "",
      description: "",
      poster: "",
      genre_id: 1,
    });
  };

  return (
    <>
      <div>
      {loadingGenres ? (
        <ClipLoader />
      ) : (
          
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div>
          <input
            type="text"
            placeholder="Movie Title"
            onChange={(e) => handleChange(e, "title")}
          />
          </div>

          {/* text box */}
          <div> 
          <textarea
            placeholder="Enter movie description..."
            onChange={(e) => handleChange(e, "description")}
            value={input.description}
            rows="4"
            cols="35"
          ></textarea>
          </div>

          {/* poster */}
          <div>
          <input
            type="text"
            placeholder="Poster URL"
            onChange={(e) => handleChange(e, "poster")}
            value={input.poster}
          />
          {/* genres dropdown */}
          <select onChange={(e) => handleChange(e, "genre_id")}>
            {genres.map((genre) => (
              <option key={genre.id} value={input.genre_id}>{genre.name}</option>
            ))}
          </select>
          </div>



          
          <Button variant="outlined" size="small" type="submit" value="Save" onClick={handleSubmit}>Save</Button>
          <Button variant="outlined" size="small" type="button" value="Cancel" onClick={cancelSubmit} >Cancel</Button>
        </form>
      )}
      </div>
    </>
  );
}

export default MovieForm;

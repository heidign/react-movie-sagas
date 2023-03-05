import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Input, Button } from "@mui/material";

function MovieForm() {
  const genres = useSelector((store) => store.genres);
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
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <input
            type="text"
            placeholder="Movie Title"
            onChange={(e) => handleChange(e, "title")}
          />
          <br/>

          {/* text box */}
          <textarea
            placeholder="description"
            onChange={(e) => handleChange(e, "description")}
            value={input.description}
            rows="4"
            cols="35"
          ></textarea>
          <br/>

          {/* poster */}
          <input
            type="text"
            placeholder="Poster URL"
            onChange={(e) => handleChange(e, "poster")}
            value={input.poster}
          />
          <br/>
          <Button variant="outlined" type="submit" value="Save" onClick={handleSubmit}>Save</Button>
          <Button variant="outlined" type="button" value="Cancel" onClick={cancelSubmit} >Cancel</Button>

          <select onChange={(e) => handleChange(e, "genre_id")}>
            {genres.map((genre) => (
              <option value={input.genre_id}>{genre.name}</option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}

export default MovieForm;

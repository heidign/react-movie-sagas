import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MovieForm() {
  const genres = useSelector((store) => store.genres);
  const dispatch = useDispatch();

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
    e.preventDefault;
    dispatch({
      type: "SUBMIT_MOVIE",
      payload: input,
    });
    clearInput();
  };
    
  const handleSelect = () => {
    setInput({ ...input, genre_id: e.target.value });
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
          <br></br>

          {/* text box */}
          <textarea
            placeholder="description"
            onChange={(e) => handleChange(e, "description")}
            value={input.description}
            rows="4"
            cols="35"
          ></textarea>
          <br></br>

          {/* poster */}
          <input
            type="text"
            placeholder="Poster URL"
            onChange={(e) => handleChange(e, "poster")}
            value={input.poster}
          />
          <br></br>
          <input type="submit" value="Submit" onClick={handleSubmit} />
                  
          <select onChange={(e) => handleChange(e, 'genre_id')}>
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

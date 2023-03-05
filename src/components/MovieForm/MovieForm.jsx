import React, { useState } from "react";
import { useDispatch } from "react-redux";

function MovieForm() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    poster: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault;
    dispatchEvent({
      type: "SUBMIT_MOVIE",
      payload: input,
    });
    clearInput();
  };

  const handleChange = (e, key) => {
    setInput({ ...input, [key]: e.target.value });
  };

  const clearInput = () => {
    setInput({
      title: "",
      description: "",
      poster: "",
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
        </form>
      </div>
    </>
  );
}

export default MovieForm;

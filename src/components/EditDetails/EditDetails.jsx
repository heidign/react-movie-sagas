import MovieDetails from "../MovieDetails/MovieDetails";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function EditDetails({movieDetails, handleEditing, clearDetails}) {
    const [value, setValue] = useState({ title: "", description: "" });

    const handleChange = (e, key) => {
        setValue({ ...value, [key]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SUBMIT_EDITS', payload: value});
        handleEditing();
        clearDetails();
      };

      useEffect(() => {
        setValue(movieDetails)
      })
    return (
        <>
            <h2>Edit Details</h2>
            <form onSubmit={handleSubmit}>
            <input type="submit" value="Save" onClick={handleSubmit}/>
            <input type="button" value="Cancel Edit" onClick={handleEditing}/>
            <div>
            <input value={value.title} onChange={e => handleChange()}/>
            </div>
            <img src={value.poster} />
            <div>
            <label htmlFor="poster">Poster URL:</label><br/>
            <input name="poster" type="text" value={value.poster} onChange={e => handleChange()}/>
            </div>
            <div>
            <textarea value={value.description} rows="4" cols="25"/>
            </div>
            </form>
        </>
    )
};

export default EditDetails;

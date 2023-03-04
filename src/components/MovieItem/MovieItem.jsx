import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function MovieItem({movie}) {
  const history = useHistory();

  const handleClick = () => {
      goToDetailsPage();
  };
    
  const goToDetailsPage = () => {
    history.push(`/details/${movie.id}`);
  };
    
  return (
    <div>
      <h3>{movie.title}</h3>
          <img onClick={handleClick} src={movie.poster} alt={movie.title} />
    </div>
  );
}

export default MovieItem;

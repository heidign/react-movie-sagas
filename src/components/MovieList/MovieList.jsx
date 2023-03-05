import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.css";

function MovieList() {
  const dispatch = useDispatch();
  const listOfMovies = useSelector((store) => store.movies.movies);
  const loadingMovies = useSelector((store) => store.movies.loading);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      {loadingMovies ? (
        <ClipLoader />
      ) : (
        <>
          <Link to="/add-new-movie">Add New Movie</Link>
          <section className="movies">
            {listOfMovies.map((movie) => {
              return <MovieItem key={movie.id} movie={movie} />;
            })}
          </section>{" "}
        </>
      )}
    </main>
  );
}

export default MovieList;

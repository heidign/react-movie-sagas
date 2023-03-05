import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import MovieItem from '../MovieItem/MovieItem';

import './MovieList.css'

function MovieList() {


    const dispatch = useDispatch();
    const listOfMovies = useSelector(store => store.movies);


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <Link to='/add-new-movie'>Add New Movie</Link>
            <section className="movies">
                {listOfMovies.map(movie => {
                    return (
                        <MovieItem key={movie.id} movie={movie} />
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;
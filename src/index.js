import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
2;
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_DETAILS", fetchDetails);
  yield takeEvery("FETCH_GENRES", fetchAllGenres);
  yield takeEvery("SUBMIT_MOVIE", submitMovie);
  yield takeEvery('CLEAR_ALL_DETAILS', clearDetails);
  yield takeEvery('SUBMIT_EDITS', submitEditDetails);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    yield wait(500);
    yield put({ type: "SET_MOVIES", payload: { loading: false, movies: movies.data } });
  } catch {
    console.log("get all error");
  }
}
// * Saga for fetching details
function* fetchDetails(action) {
  // get all details from the DB
  try {
    const movieDetails = yield axios.get(`/api/movie/${action.payload}`);
    const genreDetails = yield axios.get(`/api/genre/${action.payload}`);
    yield wait(500);
    console.log('GENRE DETAILS DATA', genreDetails.data);
    yield put({
      type: "SET_MOVIE_DETAILS", payload: {
        loading: false,
        ...movieDetails.data,
        genres: genreDetails.data.map((genre) => genre.genre)
      }
    });
  } catch (error) {
    console.log("get all error", error);
  }
}

// * Saga for fetching genres 
function* fetchAllGenres() {
  try {
    const genres = yield axios.get("/api/genre");
    yield wait(550);
    yield put({ type: "SET_GENRES",  payload: { loading: false, genres: genres.data }
});
  } catch (err) {
    console.error("get all error", err);
  }
}

// * wait function for clip loader
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// * Saga for submitting movie //
function* submitMovie(action) {
  try {
    yield axios.post('/api/movie', { ...action.payload });
    // getting new movie after submitting a movie
    yield put({ type: "FETCH_MOVIES" });
  } catch (err) {
    console.error("POST new movie error", err);
  }
}

function* clearDetails() {
  try {
    yield put({ type: 'CLEAR_DETAILS' });
  } catch (err) {
    console.error(err);
  }
}
// * Saga for submitting edit details
function* submitEditDetails(action) {
  try {
    yield axios.put(`/api/movie/edit/${action.payload.id}`, action.payload );
    // then need to fetch details, send respective id
    yield put ({ type: 'FETCH_DETAILS', payload: action.payload.id})
  } catch (err) {
    console.error('Saga error submitting edit details', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// * Movies reducer
// Used to store movies returned from the server
const movies = (state = {loading: true}, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// * Genres reducer
// Used to store the movie genres
const genres = (state = { loading: true, genres: []}, action) => {
 console.log('GENRES REDUCER', genres)
  switch (action.type) {
    case "SET_GENRES":
      return {...action.payload };
    default:
      return state;
  }
};

// * Movie details reducer
// Used to store the movie details
const movieDetails = (state = {loading: true}, action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS":
      return action.payload;
    case 'CLEAR_DETAILS':
      return {loading: true}
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);

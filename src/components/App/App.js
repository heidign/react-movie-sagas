import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieForm from "../MovieForm/MovieForm";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>

      <Router>
        {/* Add Movie page */}
        <Route>
          <MovieForm />
        </Route>

        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* passing ID as parameter */}
        <Route exact path="/details/:id">
          {/* Details page */}
          {/* TODO: URL params react router dom */}
          <MovieDetails />
        </Route>
      </Router>
    </div>
  );
}

export default App;

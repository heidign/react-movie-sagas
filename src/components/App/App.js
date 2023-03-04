import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";


function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
      {/* passing ID as parameter */}
        <Route exact path="/details/:id">
          {/* Details page */}
          {/* TODO: URL params react router dom */}
          <MovieDetails />
        </Route>

        {/* Add Movie page */}

      </Router>
    </div>
  );
}

export default App;

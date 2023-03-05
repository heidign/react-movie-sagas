import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieForm from "../MovieForm/MovieForm";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>

      <Router>
    
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Add Movie page */}
        <Route path="/add-new-movie" exact>
          <MovieForm />
        </Route>

        {/* passing ID as parameter */}
        <Route exact path="/details/:id">
          {/* Details page */}
          <MovieDetails />
        </Route>
      </Router>
    </div>
  );
}

export default App;

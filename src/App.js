import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Home from "./components/Home/";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import MovieDetails from "./components/MovieDetails";
import "./styles.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route exact path="/top-rated" Component={TopRated} />
      <Route exact path="/upcoming" Component={Upcoming} />
      <Route exact path="/movie/:id" Component={MovieDetails} />
    </Routes>
  </BrowserRouter>
);

export default App;

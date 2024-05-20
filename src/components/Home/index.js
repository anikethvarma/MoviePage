import { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

class Home extends Component {
  state = { searchInput: "", movieDetails: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=6917c7a36868e7cbd79eaf956f510e04&language=en-US&page=1",
    );

    const data = await response.json();
    const formattedData = data.results.map((eachElement) => {
      const temp = {
        id: eachElement.id,
        title: eachElement.original_title,
        poster: "https://image.tmdb.org/t/p/w500" + eachElement.poster_path,
        vote: eachElement.vote_average,
      };
      return temp;
    });

    this.setState({ movieDetails: formattedData });
  };

  onchangeSearch = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onSearch = async () => {
    const { searchInput } = this.state;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api\_key=6917c7a36868e7cbd79eaf956f510e04&language=en-US&query=${searchInput}&page=1`,
    );

    const data = await response.json();
    const formattedData = data.results.map((eachElement) => {
      const temp = {
        id: eachElement.id,
        title: eachElement.original_title,
        poster: "https://image.tmdb.org/t/p/w500" + eachElement.poster_path,
        vote: eachElement.vote_average,
      };
      return temp;
    });

    this.setState({ movieDetails: formattedData });
  };

  render() {
    const { searchInput, movieDetails } = this.state;
    return (
      <>
        <Header />
        <div className="home-main">
          <div className="home-input-div">
            <input
              type="Search"
              className="home-input"
              placeholder="Search Movie"
              onChange={this.onchangeSearch}
              value={searchInput}
            />
            <button className="submit-button" onClick={this.onSearch}>
              Search
            </button>
          </div>
          <ul className="home-ul">
            {movieDetails.map((eachElement) => (
              <li className="home-li" key={eachElement.id}>
                <Link to={`/movie/${eachElement.id}`} className="link">
                  <img src={eachElement.poster} className="li-image" />
                  <h1 className="li-title">{eachElement.title}</h1>
                  <p className="li-vote">Rating: {eachElement.vote}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Home;

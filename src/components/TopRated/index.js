import { Component } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import "./index.css";

class TopRated extends Component {
  state = { movieDetails: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=6917c7a36868e7cbd79eaf956f510e04&language=en-US&page=1"
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
    const { movieDetails } = this.state;
    return (
      <>
        <Header />
        <div className="home-main">
          <ul className="home-ul">
            {movieDetails.map((eachElement) => (
              <Link to={`/movie/${eachElement.id}`} className="link">
                <li className="home-li" key={eachElement.id}>
                  <img src={eachElement.poster} className="li-image" />
                  <h1 className="li-title">{eachElement.title}</h1>
                  <p className="li-vote">Rating: {eachElement.vote}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default TopRated;

import { Component } from "react";
import Header from "../Header";
import "./index.css";

class MovieDetails extends Component {
  state = { movieDetails: [], castDetails: [] };

  componentDidMount() {
    this.fetchCastDetails();
  }

  fetchCastDetails = async () => {
    const movie_id = window.location.href.split("/")[4];
    const Api_key = "6917c7a36868e7cbd79eaf956f510e04";

    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`,
    );
    const movieData = await movieResponse.json();
    const formattedMovieData = {
      title: movieData.original_title,
      rating: movieData.vote_average,
      runtime: movieData.runtime,
      releaseDate: movieData.release_date,
      overview: movieData.overview,
      backdropPath: movieData.backdrop_path,
      posterPath: movieData.poster_path,
      genres: movieData.genres,
    };

    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`,
    );
    const castData = await castResponse.json();
    const formattedCastData = castData.cast.map((eachElement) => {
      const temp = {
        name: eachElement.name,
        character: eachElement.character,
        profilePath: eachElement.profile_path,
      };
      return temp;
    });
    this.setState({
      movieDetails: formattedMovieData,
      castDetails: formattedCastData,
    });
  };

  render() {
    const { movieDetails, castDetails } = this.state;
    const {
      title,
      rating,
      runtime,
      releaseDate,
      overview,
      backdropPath,
      posterPath,
      genres,
    } = movieDetails;

    return (
      <div className="bg">
        <Header />
        <div className="movie-details">
          <div className="movie-details-contents">
            <div className="movie-details-main-contents">
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                className="movie-details-poster"
              />
              <div className="movie-details-main-contents-data">
                <h1 className="movie-details-title">{title}</h1>
                <p className="movie-details-rating">Rating: {rating}</p>
                <p className="movie-details-runtime">{runtime} min</p>
                <p className="movie-details-date">
                  Release Date: {releaseDate}
                </p>
              </div>
            </div>
            <h1 className="movie-details-overview-head">Overview</h1>
            <p className="movie-details-overview">{overview}</p>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
            className="backdrop-image"
          />
        </div>
        <div className="cast-details">
          <h1 className="cast-main-heading">Cast</h1>
          <ul className="cast-details-ul">
            {castDetails.map((eachElement) => (
              <li className="cast-details-li">
                <img
                  src={`https://image.tmdb.org/t/p/w500${eachElement.profilePath}`}
                  className="cast-details-pic"
                />
                <p className="cast-details-text">{eachElement.name}</p>
                <p className="cast-details-text">
                  Character: {eachElement.character}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MovieDetails;

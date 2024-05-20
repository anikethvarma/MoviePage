import { Component } from "react";

class MovieDetails extends Component {
  state = { movieDetails: [], castDetails: [] };

  componentDidMount() {
    this.fetchCastDetails();
  }

  fetchCastDetails = async () => {
    const movie_id = window.location.href.split("/")[4];
    const Api_key = "6917c7a36868e7cbd79eaf956f510e04";

    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
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
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
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
    return <h1>Movie Details</h1>;
  }
}

export default MovieDetails;

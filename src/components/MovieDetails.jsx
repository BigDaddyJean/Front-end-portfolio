import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reviews from "./Reviews";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getMovie = async () => {
    try {
      const movie = await axios.get("/movies/" + id);
      setMovie(movie.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  function getClassByRate() {
    if (movie.rating >= 8) {
      return "green";
    } else if (movie.rating >= 5.4 && movie.rating < 8) {
      return "orange";
    } else {
      return "red";
    }
  }

  const deleteMovie = async () => {
    try {
      await axios.delete(`/movies/${movie.id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) getMovie();
  }, [id]);

  return (
    <div className="container" style={{ maxWidth: "1200px", padding: "1rem" }}>
      <h1>Movie Details</h1>
      {movie === null && <p>Loading...</p>}
      {movie !== null && !movie.id && <p>No movie was found with given ID</p>}
      {movie?.id && (
        <div className="movie-detail">
          <div className="movie-detail-img">
            <img src={movie.image} />
          </div>
          <h2>{movie.name}</h2>
          <p className={getClassByRate()}>Rating: {movie.rating}</p>
          <p>{movie.description}</p>
        </div>
      )}
      {movie?.id && (
        <div className="btn-grp">
          <Link to={`/movie/${movie.id}/edit`} className="link-btn">
            Edit
          </Link>
          <Link to={`/review/${movie.id}/new`} className="link-btn">
            Leave A Review
          </Link>
          <button
            className="link-btn"
            style={{ background: "red" }}
            onClick={deleteMovie}
          >
            Delete
          </button>
        </div>
      )}
      <Reviews movie_id={id} />
    </div>
  );
};

export default MovieDetails;

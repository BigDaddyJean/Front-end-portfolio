import React from "react";
import { Link } from "react-router-dom";


export default function MovieCard(props) {
  function getClassByRate() {
    if (props.rating >= 8) {
      return "green";
    } else if (props.rating >= 5.4 && props.rating < 8) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <div className="movie">
      <Link to={`/movie/${props.id}`}>
        <img src={props.image} />
        <div className="movie-info">
          <h3>{props.name}</h3>
          <span className={getClassByRate()}>{props.rating}</span>
        </div>
        <div className="overview">
          <h3> Overview</h3>
          {props.description.slice(0, 100)}
        </div>
      </Link>
    </div>
  );
}

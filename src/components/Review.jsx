import React from "react";
import StarRating from "../StarRating";

export default function Review(props) {
  return (
    <div
      className="card text-white bg-primary mb-3 mr-4"
      style={{ maxWidth: "30%" }}
    >
      <div className="card-header d-flex justify-content-between">
        <span>{props.name}</span>
        <span>
          <StarRating rating={props.rating} />
        </span>
      </div>
      <div className="card-body">
        <p className="card-text">{props.review}</p>
      </div>
    </div>
  );
}

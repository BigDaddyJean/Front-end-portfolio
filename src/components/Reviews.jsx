import React, { useState, useEffect } from "react";
import Review from "./Review";
import axios from "axios";
import StarRating from "../StarRating";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    try {
      const res = await axios.get("/reviews/" + props.movie_id);
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (props.movie_id) getReviews();
  }, [props.movie_id]);
  const total = reviews.reduce((accu, curr) => accu + curr.rating, 0);
  console.log(total)
  return (
    <section>
      <div className="d-flex justify-content-between" style={{margin:"3.4rem 0"}}>
        <h2>Movie Reviews</h2>
        <div style={{fontSize:"2rem"}}>
          <StarRating rating={total / reviews.length} />
        </div>
      </div>

      <div className="row row-cols-3 mb-2">
        {reviews.map((review) => {
          return <Review key={review.id} {...review} />;
        })}
      </div>
    </section>
  );
};

export default Reviews;

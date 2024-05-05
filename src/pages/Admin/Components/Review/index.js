import React from "react";
import "./styles.css";
import { useAppContext } from "../../../../context/AppContext";
import ReviewsRestaurantDetail from "../../../Dashboard/components/RestaurantDetail/ReviewsRestaurantDetail";

const Review = () => {
  const { idRestaurant } = useAppContext();
  return (
    <div className="ReviewContainer">
      <ReviewsRestaurantDetail idRestaurant={idRestaurant} />
    </div>
  );
};

export default Review;

import { useQuery } from "react-query";
import { REVIEW_RESTAURANT_QUERY_KEY } from "../constant";
import apiService from "../../../api";

const getReviewsRestaurantDetail = (restaurantId) => {
  return apiService.restaurant.getReviewRestaurantDetail(restaurantId);
};

const useGetReviewsRestaurantDetail = (restaurantId) => {
  const { data: reviewsRestaurantDetailData, isLoading } = useQuery(
    [REVIEW_RESTAURANT_QUERY_KEY, restaurantId],
    () => getReviewsRestaurantDetail(restaurantId),
    { enabled: true }
  );
  return {
    reviewsRestaurantDetailData,
    isLoading,
  };
};

export default useGetReviewsRestaurantDetail;

import { useQuery } from "react-query";
import { RESTAURANT_DETAIL_QUERY_KEY } from "../constant";
import apiService from "../../../api";

const getRestaurantDetail = () => {
  return apiService.restaurant.getRestaurantDetail();
};

const useGetRestaurantDetails = (restaurantId) => {
  const { data: restaurantDetailData, isLoading } = useQuery(
    [RESTAURANT_DETAIL_QUERY_KEY, restaurantId],
    getRestaurantDetail({ restaurantId }),
    { enabled: false }
  );
  return {
    restaurantDetailData,
    isLoading,
  };
};

export default useGetRestaurantDetails;

import { useQuery } from "react-query";
import { RESTAURANT_DETAIL_QUERY_KEY } from "../constant";
import apiService from "../../../api";

const getRestaurantDetail = ({ restaurantId }) => {
  return apiService.restaurant.getRestaurantDetail({ restaurantId });
};

const useGetRestaurantDetails = (restaurantId) => {
  const {
    data: restaurantDetailData,
    isLoading,
    refetch,
  } = useQuery(
    [RESTAURANT_DETAIL_QUERY_KEY, restaurantId],
    () => getRestaurantDetail({ restaurantId }),
    { enabled: true }
  );
  return {
    restaurantDetailData,
    isLoading,
    refetch,
  };
};

export default useGetRestaurantDetails;

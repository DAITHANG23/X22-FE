import { useQuery } from "react-query";
import apiService from "../api";

const LIST_TOP_RESTAURANT_QUERY_KEY = "list-top-restaurant-data";
const getListTopRestaurantData = () => {
  return apiService.restaurant.getTopRestaurants();
};

const useGetTopRestaurants = () => {
  const { data: listRestaurantData, isLoading } = useQuery(
    LIST_TOP_RESTAURANT_QUERY_KEY,
    getListTopRestaurantData
  );
  return {
    listRestaurantData,
    isLoading,
  };
};

export default useGetTopRestaurants;

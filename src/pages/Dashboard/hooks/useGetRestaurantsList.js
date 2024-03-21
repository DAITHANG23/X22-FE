import { useQuery } from "react-query";
import { LIST_RESTAURANT_QUERY_KEY } from "../constant";
import apiService from "../../../api";

const getListRestaurantData = () => {
  return apiService.restaurant.getListRestaurantData();
};

const useGetRestaurantList = () => {
  const { data: listRestaurantData, isLoading } = useQuery(
    LIST_RESTAURANT_QUERY_KEY,
    getListRestaurantData(),
    { enabled: false }
  );
  return {
    listRestaurantData,
    isLoading,
  };
};

export default useGetRestaurantList;

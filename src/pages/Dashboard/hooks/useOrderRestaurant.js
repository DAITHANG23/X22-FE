import { QueryClient, useMutation } from "react-query";
import { ORDER_RESTAURANT_QUERY_KEY } from "../constant";
import apiService from "../../../api";

const updateOrderRestaurant = async ({ orderData }) => {
  return apiService.order.submitOrderRestaurant({ orderData });
};

const useOrderRestaurant = () => {
  const queryClient = new QueryClient();
  const [updateOrderRestaurantData, { isLoading: isUpdatingOrderRestaurant }] =
    useMutation(updateOrderRestaurant, {
      onSuccess: (res) => {
        queryClient.setQueryData(ORDER_RESTAURANT_QUERY_KEY, res);
      },
    });

  const onUpdateOrderRestaurant = (formData, onSuccess) => {
    const payload = {
      ...formData,
    };
    updateOrderRestaurantData(payload, {
      onSuccess,
    });
  };
  return {
    onUpdateOrderRestaurant,
    isUpdatingOrderRestaurant,
  };
};

export default useOrderRestaurant;

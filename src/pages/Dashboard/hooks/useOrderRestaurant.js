import { QueryClient, useMutation } from "react-query";
import { ORDER_RESTAURANT_QUERY_KEY } from "../constant";
import apiService from "../../../api";
import { useSnackbar } from "notistack";

const updateOrderRestaurant = async (orderData) => {
  return apiService.order.submitOrderRestaurant(orderData);
};

const useOrderRestaurant = () => {
  const queryClient = new QueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const OrderRestaurant = () => {
    return useMutation(updateOrderRestaurant, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [ORDER_RESTAURANT_QUERY_KEY],
          exact: true,
        });
        enqueueSnackbar("Đặt bàn thành công", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      },
    });
  };

  const {
    mutate: updateOrderRestaurantData,
    isLoading: isUpdatingOrderRestaurant,
  } = OrderRestaurant();

  const onUpdateOrderRestaurant = (formData, onSuccess) => {
    console.log("formData:", formData);
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

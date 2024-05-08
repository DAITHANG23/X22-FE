import { useMutation, useQueryClient } from "react-query";
import apiService from "../../../api";
import { REVIEW_RESTAURANT_QUERY_KEY } from "../constant";
import { useSnackbar } from "notistack";

const reviewsRestaurant = (formData) => {
  return apiService.restaurant.reviewsRestaurant(formData);
};
const useReviewsRestaurant = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(reviewsRestaurant, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [REVIEW_RESTAURANT_QUERY_KEY],
        exact: true,
      });
      enqueueSnackbar("Đánh giá thành công", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      queryClient.invalidateQueries(REVIEW_RESTAURANT_QUERY_KEY, {
        refetchInactive: true,
      });
    },

    onError: (data) => {
      enqueueSnackbar(`${data?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    },
  });
};

export default useReviewsRestaurant;

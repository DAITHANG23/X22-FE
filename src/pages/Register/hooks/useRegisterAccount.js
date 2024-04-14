import { useMutation, useQueryClient } from "react-query";
import apiService from "../../../api";
import { ACCOUNT_CUSTOMER_REGISTER_QUERY_KEY } from "../../Dashboard/constant";
import { useSnackbar } from "notistack";

const registerAccount = async (formData) => {
  return await apiService.register.createAccountCustomer({ formData });
};

const useRegisterAccount = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(registerAccount, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_CUSTOMER_REGISTER_QUERY_KEY],
        exact: true,
      });
      enqueueSnackbar("Đăng ký thành công!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    },
  });
};

export default useRegisterAccount;

import { useMutation, useQueryClient } from "react-query";
import apiService from "../../../api";
import { ACCOUNT_CUSTOMER_REGISTER_QUERY_KEY } from "../../Dashboard/constant";

const registerAccount = (formData) => {
  return apiService.register.createAccountCustomer({ formData });
};

const useRegisterAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(registerAccount, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_CUSTOMER_REGISTER_QUERY_KEY],
        exact: true,
      });
    },
  });
};

export default useRegisterAccount;

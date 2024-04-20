import { useQuery } from "react-query";
import apiService from "../api";
import { ACCOUNT_CUSTOMER_QUERY_KEY } from "../pages/Dashboard/constant";

const useAccount = () => {
  const { data: accountData, isLoading } = useQuery(
    ACCOUNT_CUSTOMER_QUERY_KEY,
    apiService.account.getAccountCustomer
  );
  return { accountData, isLoading };
};

export default useAccount;

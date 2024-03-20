import { useQuery } from "react-query";
import apiService from "../api";
import { ACCOUNT_CUSTOMER_QUERY_KEY } from "../pages/Dashboard/constant";

const useAccount = (accountId) => {
  const { data: accountData, isLoading } = useQuery(
    [ACCOUNT_CUSTOMER_QUERY_KEY, accountId],
    () => apiService.account.getAccountCustomer(accountId)
  );
  return { accountData, isLoading };
};

export default useAccount;

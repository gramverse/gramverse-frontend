import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { handleRequestError } from "../common/utilities/http-error-handler";
import { accountListResponseSchema } from "../types/account-info";
import { queryClient } from "../common/query-client";

export const useSwitchAccount = (userName: string) => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => {
      return client
        .post("users/switchAccount", {
          json: { userName },
        })
        .json();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
      queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
      navigate(`/${userName}`);
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
  return { ...rest, switchAccount: mutate };
};

export const useGetAccounts = () => {
  const httpClient = useHttpClient();
  const { data, ...rest } = useQuery({
    queryKey: ["getAccounts"],
    queryFn: () =>
      httpClient
        .get("users/accounts")
        .json()
        .then(accountListResponseSchema.parse),
  });
  return {
    ...rest,
    accounts: data?.accounts,
    isMultiple: (data?.accounts.length ?? 0) > 1,
  };
};

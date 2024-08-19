import { useMutation } from "@tanstack/react-query";

import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { urls } from "../common/routes";
import { useNavigate } from "react-router-dom";
import { ConfirmResetPasswordData } from "../common/types/reset-password";

export const useResetPassword = () => {
  // const navigate = useNavigate();

  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (token: string) =>
      httpClient.post(`reset/validate-reset-token`, { json: { token } }).json(),
    onError(error) {
      console.log(error);
    },
  });
};

export const useConfirmResetPassword = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();

  return useMutation<unknown, HTTPError, ConfirmResetPasswordData>({
    mutationFn: (data: ConfirmResetPasswordData) =>
      httpClient.post(`reset/reset-password`, { json: { data } }).json(),
    async onSuccess() {
      navigate(urls.login);
    },
  });
};

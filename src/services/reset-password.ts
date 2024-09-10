import { useMutation } from "@tanstack/react-query";

import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { urls } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { ConfirmResetPasswordData } from "../types/reset-password";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useValidateResetToken = () => {
  const navigate = useNavigate();

  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (token: string) =>
      httpClient.post(`reset/validate-reset-token`, { json: { token } }).json(),
    onError(error) {
      handleRequestError(error);
      navigate(urls.login);
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();

  return useMutation<unknown, HTTPError, ConfirmResetPasswordData>({
    mutationFn: (data: ConfirmResetPasswordData) =>
      httpClient.post(`reset/reset-password`, { json: data }).json(),
    async onSuccess() {
      navigate(urls.login);
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

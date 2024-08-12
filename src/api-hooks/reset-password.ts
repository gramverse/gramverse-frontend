import { useMutation } from "@tanstack/react-query";

import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { urls } from "../common/routes";
import { useNavigate } from "react-router-dom";
import { ResetPasswordFormData } from "../common/types/reset-password";

export const useResetPassword = () => {
  const navigate = useNavigate();

  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (location: string) =>
      httpClient.post(`/users/resetPassword`, { json: { location } }).json(),
    async onError() {
      navigate(urls.notFound);
    },
  });
};

export const useConfirmResetPassword = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, ResetPasswordFormData>({
    mutationFn: (formValue: ResetPasswordFormData) =>
      httpClient
        .post(`/users/confirmResetPassword`, { json: { formValue } })
        .json(),
    async onSuccess() {
      navigate(urls.login);
    },
  });
};

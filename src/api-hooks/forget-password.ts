import { useMutation } from "@tanstack/react-query";

import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { urls } from "../common/routes";
import { useNavigate } from "react-router-dom";
import { forgetPassFormValue } from "../common/types/forget-password";
import { handleRequestError } from "../common/http-error-handler";

export const useForgetPassword = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, forgetPassFormValue>({
    mutationFn: (formValue: forgetPassFormValue) =>
      httpClient.post(`reset/request-reset-password`, { json: formValue }).json(),
    async onSuccess() {
      navigate(urls.forgetPasswordInfo);
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

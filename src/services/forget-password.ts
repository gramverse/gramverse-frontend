import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { urls } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { forgetPassFormValue } from "../types/forget-password";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useForgetPassword = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation({
    mutationFn: (formValue: forgetPassFormValue) =>
      httpClient
        .post(`reset/request-reset-password`, { json: formValue })
        .json(),
    async onSuccess() {
      navigate(urls.forgetPasswordInfo);
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

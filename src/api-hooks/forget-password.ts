import { useMutation } from "@tanstack/react-query";

import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { urls } from "../common/routes";
import { useNavigate } from "react-router-dom";
import { forgetPassFormValue } from "../common/types/forget-password";

export const useForgetPassword = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, forgetPassFormValue>({
    mutationFn: (formValue: forgetPassFormValue) =>
      httpClient.post(`/users/resetRequest`, { json: { formValue } }).json(),
    async onSuccess() {
      navigate(urls.forgetPasswordInfo);
    },
  });
};

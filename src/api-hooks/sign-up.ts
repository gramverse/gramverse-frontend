import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { SignupFormValue } from "../common/types/sign-up";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";

export const useSignup = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, SignupFormValue>({
    mutationFn: (formValue: SignupFormValue) =>
      httpClient.post(`/users/signup`, { json: { formValue } }).json(),
    async onSuccess(_, { username }) {
      navigate(`${urls.explore}`, {
        state: { username: username, login: false },
      });
    },
  });
};

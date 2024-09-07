import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { SignupFormValue } from "../common/types/sign-up";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import { handleRequestError } from "../common/http-error-handler";

export const useSignup = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, SignupFormValue>({
    mutationFn: ({ userName, email, password }: SignupFormValue) =>
      httpClient
        .post("users/signup", {
          json: { userName, email, password },
        })
        .json(),
    async onSuccess() {
      localStorage.setItem("authorize", "signup");
      navigate("/");
    }, 
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

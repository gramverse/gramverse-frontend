import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { SignupFormValue } from "../types/sign-up";
import { useNavigate } from "react-router-dom";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useSignup = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation({
    mutationFn: ({ userName, email, password }: SignupFormValue) =>
      httpClient
        .post("users/signup", {
          json: { userName, email, password },
        })
        .json(),
    async onSuccess() {
      localStorage.removeItem("addAccount");
      localStorage.setItem("authorize", "signup");
      navigate("/");
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

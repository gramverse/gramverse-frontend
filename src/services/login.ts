import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../types/login";
import { useHttpClient } from "../common/http-client";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useLogin = () => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const registerMutation = useMutation({
    mutationFn: ({ userName, password, rememberMe }: LoginFormData) =>
      client
        .post("users/login/", {
          json: { userName, password, rememberMe },
        })
        .json(),
    onSuccess() {
      localStorage.setItem("authorize", "login");
      navigate("/");
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
  return registerMutation;
};

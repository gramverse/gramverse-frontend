import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../common/types/login";
import { useHttpClient } from "../common/http-client";

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
  });
  return registerMutation;
};

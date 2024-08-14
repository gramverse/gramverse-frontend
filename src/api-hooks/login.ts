import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData, loginResponse } from "../common/types/login";
import { useHttpClient } from "../common/http-client";

export const useLogin = () => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const registerMutation = useMutation({
    mutationFn: ({ emailOrUserName, password, rememberMe }: LoginFormData) =>
      client
        .post("/users/login/", {
          json: { userName: emailOrUserName, password, rememberMe },
        })
        .json(),
    onSuccess(data) {
      const { userName } = loginResponseSchema.parse(data);
      navigate(urls.main, { state: { userName: userName, login: true } });
    },
  });
  return registerMutation;
};

// function updateAuthToken(token: string | null) {
//   // Update the authentication token in localStorage or in a global state
//   if (token) {
//     localStorage.setItem("authToken", token);
//   } else {
//     localStorage.removeItem("authToken");
//   }
// }

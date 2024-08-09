import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../common/types/form-input-types";
import { useHttpClient } from "../common/http-client";

interface LoginResponse {
  username: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const registerMutation = useMutation({
    mutationFn: async (formData: LoginFormData) => {
      const response = await client.post("/users/login", {
        json: formData,
      });
      return response;
    },
    onSuccess: async (response) => {
      const { username } = (await response.json()) as LoginResponse;
      navigate(urls.main, { state: { username: username } });
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

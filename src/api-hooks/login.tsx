import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { API_BASE_URL as baseUrl } from "../common/base-url";
import ky from "ky";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../common/types/form-input-types";

interface LoginResponse {
  username: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const loginClient = ky.create({
    prefixUrl: baseUrl,
    timeout: 10000, // 10 seconds
    hooks: {
      afterResponse: [
        (request, options, response) => {
          if (!response.ok) {
            if (response.status >= 500 && response.status <= 600) {
              navigate(urls.main + urls.serverError);
            }
          }
          updateAuthToken(response.headers.get("x-auth-token"));
          return response;
        },
      ],
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (formData: LoginFormData) => {
      const response = await loginClient.post("login", {
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

function updateAuthToken(token: string | null) {
  // Update the authentication token in localStorage or in a global state
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
}

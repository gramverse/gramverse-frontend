import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../common/types/login";
import { useHttpClient } from "../common/http-client";
import { z } from "zod";

const loginResponseSchema = z.object({
  _id: z.string().optional(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string(),
  email: z.string().email(),
  passwordHash: z.string().optional(),
  isPrivate: z.boolean(),
  bio: z.string(),
  __v: z.number().optional(),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const registerMutation = useMutation({
    mutationFn: ({ emailOrUsername, password, rememberMe }: LoginFormData) =>
      client
        .post("/users/login", {
          json: { userName: emailOrUsername, password, rememberMe },
        })
        .json(),
    onSuccess(data) {
      const { userName } = loginResponseSchema.parse(data);
      navigate(urls.main, { state: { username: userName, login: true } });
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

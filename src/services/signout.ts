import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useSignOut = () => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const registerMutation = useMutation({
    mutationFn: () => client.post("users/signout/").json(),
    onSuccess() {
      localStorage.removeItem('addAccount')
      navigate("/login");
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
  return registerMutation;
};

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { handleRequestError } from "../common/utilities/http-error-handler";
import { queryClient } from "../common/query-client";

export const useSignOut = (onSucess?: () => void) => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const registerMutation = useMutation({
    mutationFn: () => client.post("users/signout/").json(),
    onSuccess() {
      onSucess?.();
      queryClient.invalidateQueries({ queryKey: ["getAccounts"] });
      localStorage.removeItem("addAccount");
      navigate("/");
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
  return registerMutation;
};

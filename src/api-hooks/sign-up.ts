import { useMutation } from "@tanstack/react-query";
import { client } from "../common/http-client";
import { SignupFormValue } from "../common/types/sign-up";
import { HTTPError } from "ky";
 import { useNavigate } from "react-router-dom";
 import { urls } from "../common/routes";

 async function signupApi(formvalue: SignupFormValue) {
   return client.post(`autorize`, { json: { formvalue } }).json();
  }
  
  const useSignup = () => {
  const navigate = useNavigate();
  return useMutation<unknown, HTTPError, SignupFormValue>({
    mutationFn: (formValue: SignupFormValue) => signupApi(formValue),
    onSuccess: async () => {
      navigate(`${urls.explore}`, { state: { username: 'username' } }); //setusername
    },

  });
};

export { useSignup };

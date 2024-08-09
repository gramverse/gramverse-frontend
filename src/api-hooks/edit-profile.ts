import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { SignupFormValue } from "../common/types/sign-up";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { ProfileFormValue } from "../common/types/profile";

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery<unknown, HTTPError, ProfileFormValue>({
    queryKey: ['getProfile'],
    queryFn: () => httpClient.get(`user/getProfile`).json(),
  });
};


export const useEditProfile = () => {
    const navigate = useNavigate();
    const httpClient = useHttpClient();
    return useMutation<unknown, HTTPError, ProfileFormValue>({
      mutationFn: (formValue: ProfileFormValue) =>
        httpClient.post("user/profile/edit", { json: { formValue } }).json(),
      async onSuccess() {
        navigate(urls.main + urls.myPage);
      },
    });
  };
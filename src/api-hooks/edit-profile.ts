import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { ProfileFormValue } from "../common/types/profile";

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery<unknown, HTTPError, ProfileFormValue>({
    queryKey: ["getProfile"],
    queryFn: () => httpClient.get(`users/profile`).json(),
  });
};

export const useEditProfile = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, ProfileFormValue>({
    mutationFn: ({
      profileImage,
      confirmPassword,
      ...rest
    }: ProfileFormValue) => {
      const formData = new FormData();
      formData.append("profileFields", JSON.stringify(rest));
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      console.log("request body", formData);
      return httpClient.post("/files/myProfile", { body: formData }).json();
    },
    async onSuccess() {
      navigate(urls.myPage);
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { ProfileFormValue } from "../common/types/profile";

export const useEditProfile = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, ProfileFormValue>({
    mutationFn: ({
      profileImage,
      // confirmPassword,
      ...rest
    }: ProfileFormValue) => {
      const formData = new FormData();
      formData.append("profileFields", JSON.stringify(rest));
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      return httpClient.post("/files/myProfile", { body: formData }).json();
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { ProfileFormValue } from "../types/profile";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useEditProfile = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, ProfileFormValue>({
    mutationFn: ({
      profileImage,
      ...rest
    }: ProfileFormValue) => {
      const formData = new FormData();
      formData.append("profileFields", JSON.stringify(rest));
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      return httpClient.post("files/myProfile", { body: formData }).json();
    },
    onSuccess,
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

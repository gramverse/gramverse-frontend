import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { PostFormData } from "../common/types/post";

export const useCreatePost = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, PostFormData>({
    mutationFn: ({ photos, ...rest }: PostFormData) => {
      const formData = new FormData();
      formData.append("postFields", JSON.stringify(rest));
      Array.from(photos).forEach((photo, index) => {
        formData.append(`photo${index}`, photo);
      });
      return httpClient.post("/users/createPost", { body: formData }).json();
    },
    async onSuccess() {
      navigate(urls.myPage);
    },
  });
};

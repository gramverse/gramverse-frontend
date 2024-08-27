import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { EditPostFormData, PostFormData } from "../common/types/post";

export const useCreatePost = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, PostFormData>({
    mutationFn: ({ photoFiles, ...rest }: PostFormData) => {
      const formData = new FormData();
      const { caption, mentions } = rest;
      formData.append("postFields", JSON.stringify({ caption, mentions }));
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/addPost", { body: formData }).json();
    },
    onSuccess,
  });
};

export const useEditPost = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, EditPostFormData>({
    mutationFn: ({ photoFiles, ...rest }: EditPostFormData) => {
      const formData = new FormData();
      const { caption, mentions, photoURLs, _id } = rest;
      formData.append(
        "postFields",
        JSON.stringify({ caption, mentions, photoUrls: photoURLs, _id }),
      );
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/editPost", { body: formData }).json();
    },
    onSuccess,
  });
};

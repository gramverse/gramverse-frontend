import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import {
  EditPostFormData,
  PostDetail,
  PostFormData,
} from "../common/types/post";

export const useGetPost = (id: string | undefined) => {
  const httpClient = useHttpClient();
  return useQuery<unknown, HTTPError, PostDetail>({
    queryKey: ["getPost"],
    queryFn: () => (id ? httpClient.get(`posts/post/${id}`).json() : () => {}),
  });
};

export const useCreatePost = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, PostFormData>({
    mutationFn: ({ photoFiles, ...rest }: PostFormData) => {
      const formData = new FormData();
      const { caption, mentions } = rest;
      formData.append("postFields", JSON.stringify({ caption, mentions }));
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/addPost", { body: formData }).json();
    },
    async onSuccess() {
      navigate(-1);
    },
  });
};

export const useEditPost = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, EditPostFormData>({
    mutationFn: ({ photoFiles, ...rest }: EditPostFormData) => {
      const formData = new FormData();
      const { caption, mentions, photoURLs } = rest;
      formData.append(
        "postFields",
        JSON.stringify({ caption, mentions, photoUrls: photoURLs }),
      );
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/editPost", { body: formData }).json();
    },
    async onSuccess() {
      navigate(-1);
    },
  });
};

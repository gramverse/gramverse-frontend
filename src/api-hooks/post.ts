import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { CreatePostFormData, EditPostFormData } from "../common/types/post";
import { z } from "zod";
import { queryClient } from "../common/query-client";

export const useCreatePost = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, CreatePostFormData>({
    mutationFn: ({ photoFiles, ...rest }: CreatePostFormData) => {
      const formData = new FormData();
      const { caption, mentions, forCloseFriends } = rest;
      formData.append(
        "postFields",
        JSON.stringify({ caption, mentions, forCloseFriends }),
      );
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/addPost", { body: formData }).json();
    },
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
    },
  });
};

export const useEditPost = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, EditPostFormData>({
    mutationFn: ({ photoFiles, ...rest }: EditPostFormData) => {
      const formData = new FormData();
      const { caption, mentions, photoURLs, _id, forCloseFriends } = rest;
      formData.append(
        "postFields",
        JSON.stringify({
          caption,
          mentions,
          photoUrls: photoURLs,
          _id,
          forCloseFriends,
        }),
      );
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/editPost", { body: formData }).json();
    },
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
    },
  });
};

const UserExists = z.object({
  exists: z.boolean(),
});
export const useFindUser = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery({
    queryKey: ["findUser", userName],
    queryFn: () =>
      httpClient
        .get(`users/check-username/${userName}`)
        .json()
        .then(UserExists.parse),
    enabled: userName !== "" && userName !== undefined,
  });
};

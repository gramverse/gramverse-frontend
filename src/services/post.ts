import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import {
  CreatePostFormData,
  EditPostFormData,
  UserExists,
} from "../types/post";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useCreatePost = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation({
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
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

export const useEditPost = (onSuccess: () => void) => {
  const httpClient = useHttpClient();
  return useMutation({
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
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

export const useFindUser = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery({
    queryKey: ["findUser", userName],
    queryFn:
      userName !== ""
        ? () =>
            httpClient
              .get(`users/check-username/${userName}`)
              .json()
              .then(UserExists.parse)
        : skipToken,
  });
};

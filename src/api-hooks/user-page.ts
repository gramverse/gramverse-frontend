import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { queryClient } from "../common/query-client";
import { getPostsResponseSchema, Post } from "../common/types/post";
import { UserProfile, userProfileSchema } from "../common/types/user-profile";

export const useGetUserProfile = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery<UserProfile, HTTPError>({
    queryKey: ["getUserProfile"],
    queryFn: () =>
      httpClient
        .get(`users/profile/${userName}`)
        .json()
        .then(userProfileSchema.parse)
  });
};

export type FollowMutationArgs = { userName: string; follow: boolean };

export const useFollowUser = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, FollowMutationArgs>({
    mutationFn: ({ userName, follow }) => {
      const url = follow ? "users/follow" : "users/unfollow";
      const json = { followingUserName: userName };
      return httpClient.post(url, { json }).json();
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables.userName],
      });
    },
  });
};

export const useCancelRequest = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (userName) => {
      const json = { userName: userName };
      return httpClient.post("users/cancelRequest", { json }).json();
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables],
      });
    },
  });
};

export const useGetUserPosts = (
  userName: string | undefined,
  allowedViewPost: boolean | undefined,
) => {
  const httpClient = useHttpClient();
  return useQuery<Post[], HTTPError>({
    queryKey: ["getPosts", userName],
    queryFn: () =>
      httpClient
        .get(`posts/username/${userName}`)
        .json()
        .then(getPostsResponseSchema.parse),
    enabled: userName != undefined && allowedViewPost,
  });
};

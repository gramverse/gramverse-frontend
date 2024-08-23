import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import {
  FollowingProfile,
  followingProfileSchema,
} from "../common/types/following-profile";
import { queryClient } from "../common/query-client";
import { getPostsResponseSchema, Post } from "../common/types/post";

export const useGetUserProfile = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery<FollowingProfile, HTTPError>({
    queryKey: ["getUserProfile"],
    queryFn: () =>
      httpClient
        .get(`users/profile/${userName}`)
        .json()
        .then((data) => {
          return followingProfileSchema.parse(data);
        }),
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
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getFollowingProfile"] });
    },
  });
};

export const useGetUserPosts = (
  userName: string | undefined,
  isFollowed: boolean | undefined,
) => {
  const httpClient = useHttpClient();
  return useQuery<Post[], HTTPError>({
    queryKey: ["getPosts", userName],
    queryFn: () =>
      httpClient
        .get(`posts/username/${userName}`)
        .json()
        .then(getPostsResponseSchema.parse),
    enabled: userName != undefined && isFollowed,
  });
};

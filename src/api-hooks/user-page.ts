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
    queryKey: ["getFollowingProfile"],
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
      // onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["getFollowingProfile"] });
      // queryClient.setQueryData(["getFollowingProfile"], data)
    },
  });
};

export const useGetUserPosts = (userName: string | undefined , isFollowed: boolean| undefined) => {
  //using username & change api url
  const httpClient = useHttpClient();
  return useQuery<Post[], HTTPError>({
    queryKey: ["getPosts"],
    queryFn: () =>
      httpClient.get("users/posts").json().then(getPostsResponseSchema.parse),
    enabled: (userName != undefined && isFollowed),
  });
};

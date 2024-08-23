import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { getPostsResponseSchema, Post } from "../common/types/post";
import { Profile, ProfileSchema } from "../common/types/profile-data";

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery<Profile, HTTPError>({
    queryKey: ["getProfile"],
    queryFn: () =>
      httpClient.get(`users/myProfile`).json().then(ProfileSchema.parse),
  });
};

export const useGetPosts = () => {
  const httpClient = useHttpClient();
  return useQuery<Post[], HTTPError>({
    queryKey: ["getPosts"],
    queryFn: () =>
      httpClient.get("posts/myPosts").json().then(getPostsResponseSchema.parse),
    retry: false,
  });
};

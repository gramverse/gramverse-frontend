import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import ky, { HTTPError } from "ky";
import {
  FollowingProfile,
  followingProfileSchema,
} from "../common/types/following-profile";
import { queryClient } from "../common/query-client";

export const useGetFollowingProfile = (userName: string) => {
  console.log("oftad", userName);
  const httpClient = useHttpClient();
  return useQuery<FollowingProfile, HTTPError>({
    queryKey: ["getFollowingProfile"],
    queryFn: () =>
      httpClient
        .get(`users/profile/${userName}`)
        .json()
        .then((data) => {
          console.log({ data });
          return followingProfileSchema.parse(data);
        }),
  });
};

export const useFollow = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (userName: string) => {
      return httpClient
        .post("/users/follow", {
          json: { followingUserName: userName },
        })
        .json();
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["getFollowingProfile"] });
      // queryClient.setQueryData(["getFollowingProfile"], data)
    },
  });
};

export const useUnFollow = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (userName: string) => {
      return httpClient
        .post("/users/unfollow", {
          json: { followingUserName: userName },
        })
        .json();
    },
  });
};

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

export type FollowMutationArgs = { userName: string; follow: boolean };

export const useFollow = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, FollowMutationArgs>({
    mutationFn: ({ userName, follow }) => {
      const url = follow ? "/users/follow" : "/users/unfollow";
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

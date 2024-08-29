import { useInfiniteQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { UserInfoSummary, UsersInfoSchema } from "../common/types/user";

export const useGetCloseFriends = () => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<UserInfoSummary[], HTTPError>({
    queryKey: ["close-friends"],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`users/getCloseFriends?pageNumber=${pageParam}?limit:${10}'`)
        .json()
        .then(UsersInfoSchema.parse),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const useGetBlackList = () => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<UserInfoSummary[], HTTPError>({
    queryKey: ["blackList"],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`users/getBlackList?pageNumber=${pageParam}?limit:${10}'`)
        .json()
        .then(UsersInfoSchema.parse),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

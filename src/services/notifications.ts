import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import {
  FollowingNotifications,
  MyNotifications,
} from "../types/notifications";
import { HTTPError } from "ky";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useGetMyNotifications = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<MyNotifications, HTTPError>({
    queryKey: ["my-notifications"],
    queryFn: ({ pageParam }) =>
      httpClient
        .get(`notifications/mine?page=${pageParam}&limit=${limit}`)
        .json(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const useGetFollowingNotifications = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<FollowingNotifications, HTTPError>({
    queryKey: ["friends-notifications"],
    queryFn: ({ pageParam }) =>
      httpClient
        .get(`notifications/followings?page=${pageParam}&limit=${limit}`)
        .json(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};
export const useGetNotificationCount = () => {
  const httpClient = useHttpClient();
  return useQuery<{ unreadCount: number }>({
    queryKey: ["notificationCount"],
    queryFn: () => httpClient.get(`notifications/unreadCount`).json(),
    refetchInterval: 10000,
  });
};
type AcceptRequest = {
  followerUserName: string;
  accepted: boolean;
};
export const useAcceptRequest = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, AcceptRequest>({
    mutationFn: (data: AcceptRequest) =>
      httpClient
        .post("users/acceptRequest", {
          json: data,
        })
        .json(),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables.followerUserName],
      });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

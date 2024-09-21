import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import {
  followingNotifications,
  myNotifications,
} from "../types/notifications";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/utilities/http-error-handler";
import { unreadCount } from "../types/notifications";

export const useGetMyNotifications = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["my-notifications"],
    queryFn: ({ pageParam }) =>
      httpClient
        .get(`notifications/mine?page=${pageParam}&limit=${limit}`)
        .json()
        .then(myNotifications.parse),
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
  return useInfiniteQuery({
    queryKey: ["friends-notifications"],
    queryFn: ({ pageParam }) =>
      httpClient
        .get(`notifications/followings?page=${pageParam}&limit=${limit}`)
        .json()
        .then(followingNotifications.parse),
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
  return useQuery({
    queryKey: ["notificationCount"],
    queryFn: () =>
      httpClient
        .get(`notifications/unreadCount`)
        .json()
        .then(unreadCount.parse),
    refetchInterval: 120000,
  });
};
type AcceptRequest = {
  followerUserName: string;
  accepted: boolean;
};
export const useAcceptRequest = () => {
  const httpClient = useHttpClient();
  return useMutation({
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
      queryClient.invalidateQueries({
        queryKey: ["my-notifications"],
      });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import {
  FollowingNotifications,
  MyNotifications,
} from "../common/types/notifications";
import { HTTPError } from "ky";

export const useGetMyNotifications = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<MyNotifications, HTTPError>({
    queryKey: ["myNotifications"],
    queryFn: ({ pageParam }) =>
      httpClient
        .get(`users/myNotifications?page=${pageParam}&limit=${limit}`)
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
    queryKey: ["myNotifications"],
    queryFn: ({ pageParam }) =>
      httpClient
        .get(`users/followingsNotification?page=${pageParam}&limit=${limit}`)
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
  return useQuery<{ count: number }>({
    queryKey: ["notificationCount"],
    queryFn: () => httpClient.get(`users/notifications`).json(),
  });
};

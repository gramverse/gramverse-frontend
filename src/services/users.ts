import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { UserResponseSchema } from "../types/user";
import { queryClient } from "../common/query-client";
import { Keys } from "../assets/constants/query-keys";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useGetCloseFriends = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["closeFriends"],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`users/closeFriends`, { searchParams: { page: pageParam, limit } })
        .json()
        .then(UserResponseSchema.parse),
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

export const useGetBlackList = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["blackList"],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`users/blackList`, { searchParams: { page: pageParam, limit } })
        .json()
        .then(UserResponseSchema.parse),
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

export const useBlockUser = (onSuccess: () => void) => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: { followingUserName: string; isBlock: boolean }) => {
      return client
        .post("users/block", {
          json: data,
        })
        .json();
    },
    onSuccess(_, variables) {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["blackList"] });
      queryClient.invalidateQueries({
        queryKey: [Keys.userProfile, variables.followingUserName],
      });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

export const useAddCloseFriends = (onSuccess: () => void) => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: { userName: string; isAdd: boolean }) => {
      return client
        .post("users/closeFriend", {
          json: data,
        })
        .json();
    },
    onSuccess(_, variables) {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["closeFriends"] });
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables.userName],
      });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

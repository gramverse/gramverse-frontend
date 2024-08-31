import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { queryClient } from "../common/query-client";
import { getPostResponseSchema } from "../common/types/post";
import { UserProfile, userProfileSchema } from "../common/types/user-profile";

export const useGetUserProfile = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery<UserProfile, HTTPError>({
    queryKey: ["getUserProfile", userName],
    queryFn: () =>
      httpClient
        .get(`users/profile/${userName}`)
        .json()
        .then(userProfileSchema.parse),
  });
};

export type FollowMutationArgs = { userName: string; follow: boolean };

export const useFollowUser = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, FollowMutationArgs>({
    mutationFn: ({ userName, follow }) => {
     // const url = follow ? "users/follow" : "users/unfollow";
      const json = { followingUserName: userName , isFollow: follow};
      return httpClient.post("users/follow", { json }).json();
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables.userName],
      });
    },
  });
};

export const useCancelRequest = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (userName) => {
      const json = { userName: userName };
      return httpClient.post("users/cancelRequest", { json }).json();
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables],
      });
    },
  });
};

// export const useGetUserPosts = (
//   userName: string | undefined,
//   allowedViewPost: boolean | undefined,
// ) => {
//   const httpClient = useHttpClient();
//   return useQuery({
//     queryKey: ["getPosts", userName],
//     queryFn: () =>
//       httpClient
//         .get(`posts/username/${userName}`)
//         .json()
//         .then(getPostResponseSchema.parse),
//     enabled: userName != undefined && allowedViewPost,
//   });
// };

export const useGetUserPosts = (
  userName: string | undefined,
  allowedViewPost: boolean | undefined,
  limit: number,
) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  return useInfiniteQuery({
    queryKey: ["getUserPosts", userName], //va ye chiz dg
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get(`posts/username/${userName}`, {
          searchParams: { page: pageParam, limit },
        })
        .json()
        .then(getPostResponseSchema.parse);
    },
    initialPageParam: initialPageParam,
    getNextPageParam: (lastPage, pages) => {
      const totalPage = lastPage.totalCount / limit;
      return pages.length > totalPage
        ? undefined
        : initialPageParam + pages.length;
    },
    enabled: userName != undefined && allowedViewPost,
  });
};

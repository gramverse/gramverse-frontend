import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { getPostResponseSchema } from "../common/types/post";
import { Profile, ProfileSchema } from "../common/types/profile-data";

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery<Profile, HTTPError>({
    queryKey: ["getProfile"],
    queryFn: () =>
      httpClient.get(`users/myProfile`).json().then(ProfileSchema.parse),
  });
};

// export const useGetPosts = () => {
//   const httpClient = useHttpClient();
//   return useQuery({
//     queryKey: ["getPosts"],
//     queryFn: () =>
//       httpClient.get("posts/myPosts").json().then(getPostResponseSchema.parse),
//     retry: false,
//   });
// };

export const useGetPosts = (limit: number) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  return useInfiniteQuery({
    queryKey: ["getMyPosts"],
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get(`posts/myPosts`, {
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
  });
};

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { getPostResponseSchema } from "../types/post";
import { ProfileSchema } from "../types/profile-data";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: () =>
      httpClient.get(`users/myProfile`).json().then(ProfileSchema.parse),
  });
};

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

export const useRemoveFollower = (
  followerUserName: string,
  myUserName: string,
) => {
  const httpClient = useHttpClient();
  return useMutation({
    async mutationFn() {
      const json = { followerUserName: followerUserName };
      return httpClient.post("users/removeFollow", { json }).json();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Followingers", myUserName, false],
      });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

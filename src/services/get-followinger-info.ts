import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { followingerResponseSchema } from "../types/followinger-info";

export const useGetFollowingerList = (
  userName: string,
  isFollowing: boolean,
  limit: number,
) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  return useInfiniteQuery({
    queryKey: ["Followingers", userName, isFollowing],
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get(`users/followingers`, {
          searchParams: { page: pageParam, limit, userName, isFollowing },
        })
        .json()
        .then(followingerResponseSchema.parse);
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

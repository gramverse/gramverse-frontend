import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { explorePostsResponseSchema } from "../common/types/explore";

export const useGetExplorePosts = (limit: number) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  return useInfiniteQuery({
    queryKey: ["getExplorePosts"],
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get("posts/explorePosts", {
          searchParams: { page: pageParam, limit },
        })
        .json()
        .then(explorePostsResponseSchema.parse);
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

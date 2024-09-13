import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { bookmarkPostsResponseSchema } from "../types/bookmark-post";

export const useGetBookmarkedPosts = (limit: number) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["getBookmarkedPosts"],
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get("posts/myBookmarks", {
          searchParams: { page: pageParam, limit },
        })
        .json()
        .then(bookmarkPostsResponseSchema.parse);
    },
    initialPageParam: initialPageParam,
    getNextPageParam: (lastPage, pages) => {
      const totalPage = lastPage.totalCount / limit;
      return pages.length > totalPage
        ? undefined
        : initialPageParam + pages.length;
    },
  });
  return {
    ...rest,
    data: data,
    isEmptyGallery: data?.pages[data.pages.length - 1]?.totalCount == 0,
  };
};

import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { mentionPostsResponseSchema } from "../types/mention-post";

export const useGetMentionedPosts = (limit: number) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["getmentionedPosts"],
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get("posts/myMentions", {
          searchParams: { page: pageParam, limit },
        })
        .json()
        .then(mentionPostsResponseSchema.parse);
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

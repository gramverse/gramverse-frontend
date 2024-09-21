import { useHttpClient } from "../common/http-client";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { PostDetailSchema } from "../types/post-detail";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const useGetPost = (id: string | undefined) => {
  const httpClient = useHttpClient();
  return useQuery({
    queryKey: ["getPost", id],
    queryFn:
      id && id !== ""
        ? () =>
            httpClient
              .get(`posts/post/${id}`)
              .json()
              .then(PostDetailSchema.parse)
        : skipToken,
    enabled: id !== undefined,
  });
};

type LikeMutationPayload = { postId: string; isLike: boolean };
export const useLikePost = () => {
  const httpClient = useHttpClient();
  return useMutation({
    mutationFn: ({ postId, isLike }: LikeMutationPayload) =>
      httpClient
        .post("posts/like", {
          json: { postId, isLike },
        })
        .json(),
    onError: (error) => {
      handleRequestError(error);
    },
    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getPost", postId],
      });
      queryClient.invalidateQueries({ queryKey: ["getExplorePosts"] });
    },
  });
};

type BookmarkMutationPayload = { postId: string; isBookmark: boolean };
export const useBookmarkPost = () => {
  const httpClient = useHttpClient();
  return useMutation({
    mutationFn: ({ postId, isBookmark }: BookmarkMutationPayload) =>
      httpClient
        .post("posts/bookmark", {
          json: { postId, isBookmark },
        })
        .json(),
    onError: (error) => {
      handleRequestError(error);
    },
    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getPost", postId],
      });
      queryClient.invalidateQueries({ queryKey: ["getExplorePosts"] });
    },
  });
};

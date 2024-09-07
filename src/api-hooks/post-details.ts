import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostDetail } from "../common/types/post-detail";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/http-error-handler";

export const useGetPost = (id: string | undefined) => {
  const httpClient = useHttpClient();
  return useQuery<PostDetail, HTTPError>({
    queryKey: ["getPost", id],
    queryFn: () => httpClient.get(`posts/post/${id}`).json(),
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
    onSettled: (_data, _error, { postId }) =>
      queryClient.invalidateQueries({
        queryKey: ["getPost", postId],
      }),
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
    onSettled: (_data, _error, { postId }) =>
      queryClient.invalidateQueries({
        queryKey: ["getPost", postId],
      }),
  });
};

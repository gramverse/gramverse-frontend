import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import {
  AddCommentData,
  CommentsResponse,
  CommentsResponseSchema,
} from "../common/types/comment";
import { LikeComment } from "../common/types/comment";
import { queryClient } from "../common/query-client";
import { HTTPError } from "ky";
export const useSendComment = (postId: string) => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: AddCommentData) => {
      return client
        .post("posts/addComment", {
          json: data,
        })
        .json();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getComments", postId] });
    },
  });
};

export const useLikeComment = ({ postId }: { postId: string }) => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: LikeComment) =>
      client
        .post("posts/likeComment", {
          json: data,
        })
        .json(),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["getComments", postId],
      }),
  });
};

export const useGetComments = ({ postId }: { postId: string }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<CommentsResponse, HTTPError>({
    queryKey: ["getComments", { postId }],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`posts/comments?postId=${postId}&page=${pageParam}&limit=${5}`)
        .json()
        .then(CommentsResponseSchema.parse),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * 5;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

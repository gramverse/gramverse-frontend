import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { AddCommentData, CommentsResponseSchema } from "../types/comment";
import { LikeComment } from "../types/comment";
import { queryClient } from "../common/query-client";
import { handleRequestError } from "../common/utilities/http-error-handler";
export const useSendComment = (postId: string) => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: Omit<AddCommentData, "parentCommentUserName">) => {
      return client
        .post("posts/addComment", {
          json: data,
        })
        .json();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getComments", postId] });
    },
    onError: (error) => {
      handleRequestError(error);
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
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getComments", postId],
      }),
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

export const useGetComments = ({
  postId,
  limit,
}: {
  postId: string;
  limit: number;
}) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["getComments", postId],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`posts/comments?postId=${postId}&page=${pageParam}&limit=${limit}`)
        .json()
        .then(CommentsResponseSchema.parse),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
    retry: 3,
  });
};

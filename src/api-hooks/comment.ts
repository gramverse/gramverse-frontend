import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { CommentData } from "../common/types/comment";
import { LikeComment } from "../common/types/comment";
import { queryClient } from "../common/query-client";
export const useSendComment = (id: string) => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: CommentData) => {
      return client
        .post("posts/addComment", {
          json: data,
        })
        .json();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getPost", id] });
    },
  });
};

export const useLikeComment = () => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: LikeComment) =>
      client
        .post("posts/likeComment", {
          json: data,
        })
        .json(),
    //  onSettled: (_data, _error, { commentId }) =>
    //     queryClient.invalidateQueries({
    //       queryKey: ["getComments", commentId],
    //     }),
  });
};

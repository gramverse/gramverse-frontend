import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { CommentData } from "../common/types/comment";
import { LikeComment } from "../common/types/comment";
export const useSendComment = () => {
  const client = useHttpClient();
  return useMutation({
    mutationFn: (data: CommentData) =>
      client
        .post("posts/addComments", {
          json: data,
        })
        .json(),
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
  });
};

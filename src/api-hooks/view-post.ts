import { HTTPError } from "ky";
import { useHttpClient } from "../common/http-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostDetail } from "../common/types/post-detail";
import { queryClient } from "../common/query-client";

export const useGetPost = (id: string) => {
  const httpClient = useHttpClient();
  return useQuery<PostDetail, HTTPError>({
    queryKey: ["getPost", id],
    queryFn: () => httpClient.get(`posts/${id}`).json(),
    enabled: id != undefined,
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

    onMutate() {},
    onSettled: (_data, _error, { postId }) =>
      queryClient.invalidateQueries({
        queryKey: ["getPost", postId],
      }),
    //async onSuccess() {},
  });
};

export const useBookmarkPost = () => {
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, string>({
    mutationFn: (postId: string) =>
      httpClient
        .post("post/bookmark", {
          json: { postId },
        })
        .json(),
    async onSuccess() {},
  });
};

import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { appUserInfo, appUserInfoSchema } from "../common/types/appUserInfo";
import { Post, PostSchema } from "../common/types/post";
//import { Post, PostInfoSchema } from "../common/types/post-info";

// const validatedData = await schema.parseAsync(unvalidatedData);
// const result = await schema.safeParse(unvalidatedData);
// result.success
// result.data
// result.error

export const useGetAppUserInfo = () => {
  const httpClient = useHttpClient();
  return useQuery<appUserInfo, HTTPError>({
    queryKey: ["getAppUserInfo"],
    queryFn: () =>
      httpClient
        .get("users/getAppUserInfo")
        .json()
        .then(appUserInfoSchema.parse),
  });
};

export const useGetPosts = () => {
  const httpClient = useHttpClient();
  return useQuery<Post, HTTPError>({
    queryKey: ["getPosts"],
    queryFn: () =>
      httpClient.get("users/getPosts").json().then(PostSchema.parse),
  });
};

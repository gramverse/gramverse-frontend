import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { Post, PostSchema } from "../common/types/post";
import { Profile, ProfileSchema } from "../common/types/profle-data";
//import { Post, PostInfoSchema } from "../common/types/post-info";

// const validatedData = await schema.parseAsync(unvalidatedData);
// const result = await schema.safeParse(unvalidatedData);
// result.success
// result.data
// result.error

// export const useGetAppUserInfo = () => {
//   const httpClient = useHttpClient();
//   return useQuery<appUserInfo, HTTPError>({
//     queryKey: ["getAppUserInfo"],
//     queryFn: () =>
//       httpClient
//         .get("users/getAppUserInfo")
//         .json()
//         .then(appUserInfoSchema.parse),
//   });
// };

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery<Profile, HTTPError>({

    queryKey: ["getProfile"],
    queryFn: () =>
      httpClient.get(`users/myProfile`).json()
    //.then(ProfileSchema.parse),
  });
};

const getPostsResponseSchema = PostSchema.array();

export const useGetPosts = () => {
  const httpClient = useHttpClient();
  return useQuery<Post[], HTTPError>({
    queryKey: ["getPosts"],
    queryFn: () =>
      httpClient
        .get("users/posts")
        .json()
        .then(getPostsResponseSchema.parse),
    retry: false,
  });
};

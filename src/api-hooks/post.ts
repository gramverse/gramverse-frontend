import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { PostFormData } from "../common/types/post";

// export const useGetPost = (id:number|null) => {
//   const httpClient = useHttpClient();
//   return useQuery<unknown, HTTPError, Post>({
//     queryKey: ["getPost"],
//     queryFn: () => id?httpClient.get(`users/post/id:${id}`).json():()=>{},
//   });
// };

export const useCreatePost = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, PostFormData>({
    mutationFn: ({ photoFiles, ...rest }: PostFormData) => {
      const formData = new FormData();
      const { caption, mentions } = rest;
      formData.append("postFields", JSON.stringify({ caption, mentions }));
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/addPost", { body: formData }).json();
    },
    async onSuccess() {
      navigate(urls.myPage);
    },
  });
};

export const useEditPost = () => {
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  return useMutation<unknown, HTTPError, PostFormData>({
    mutationFn: ({ photoFiles, ...rest }: PostFormData) => {
      const formData = new FormData();
      const { caption, mentions, photoURLs } = rest;
      formData.append(
        "postFields",
        JSON.stringify({ caption, mentions, photoUrls: photoURLs }),
      );
      photoFiles.forEach((file) => formData.append("photoFiles", file));
      return httpClient.post("files/addPost", { body: formData }).json();
    },
    async onSuccess() {
      navigate(urls.myPage);
    },
  });
};

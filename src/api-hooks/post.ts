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
    mutationFn: ({ photos, ...rest }: PostFormData) => {
      const formData = new FormData();
      const newFields = { caption: rest.caption, mentioned: rest.mentions };
      formData.append("postFields", JSON.stringify(newFields));
      console.log(formData.get("postFields"));
      if (photos instanceof FileList) {
        Array.from(photos).forEach((photo) =>
          formData.append("postImages", photo),
        );
        console.log(formData);
      } else {
        formData.append("postImages", JSON.stringify(photos));
      }
      return httpClient.post("files/addPost", { body: formData }).json();
    },
    async onSuccess() {
      navigate(urls.myPage);
    },
  });
};

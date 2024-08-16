import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { ProfileSchema } from "../common/types/profle-data";

export const useGetFollowingProfile = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery<unknown, HTTPError>({
    queryKey: ["getFollowingProfile"],
    queryFn: () =>
      httpClient
        .get(`users/GetFollowingInfo/userName:${userName}`)
        .json()
        .then(ProfileSchema.parse),
  });
};

import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { Profile } from "../common/types/profile-data";

export const useGetProfile = () => {
  const httpClient = useHttpClient();
  return useQuery<Profile, HTTPError>({
    queryKey: ["getProfile"],
    queryFn: () => httpClient.get(`users/myProfile`).json(),
    retry: 3,
  });
};

import { skipToken, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { Profile, ProfileSchema } from "../types/profile-data";
import { useLocation } from "react-router-dom";

export const useGetProfile = () => {
  const location = useLocation();
  const httpClient = useHttpClient();
  const getProfile =
    !location.pathname.includes("login") &&
    !location.pathname.includes("signup") &&
    !location.pathname.includes("forget-password") &&
    !location.pathname.includes("reset-password");
  return useQuery<Profile, HTTPError>({
    queryKey: ["getProfile"],
    queryFn: getProfile
      ? () => httpClient.get(`users/myProfile`).json().then(ProfileSchema.parse)
      : skipToken,
  });
};

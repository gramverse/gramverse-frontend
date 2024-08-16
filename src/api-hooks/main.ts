import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL as baseUrl } from "../common/base-url";
import ky, { HTTPError } from "ky";
import { ProfileData } from "../common/types/profle-data";

export const useGetProfileSummary = () => {
  const httpClient = ky.create({
    prefixUrl: baseUrl,
    timeout: 5000,
  });

  return useQuery<HTTPError, unknown, ProfileData>({
    queryKey: ["getProfileSummary"],
    queryFn: async () => httpClient.get("/users/profile").json(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { Profile } from "../common/types/profle-data";

export const useGetProfileSummary = () => {
  const httpClient = useHttpClient();
  return useQuery<HTTPError, unknown, Profile>({
    queryKey: ["getProfileSummary"],
    queryFn: async () => httpClient.get("/users/myProfile").json(),
  });
};

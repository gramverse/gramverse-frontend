import { skipToken, useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { searchAccountSchema, searchPostSchema } from "../types/search";

export const useGetAccounts = ({
  limit,
  keyword,
}: {
  limit: number;
  keyword: string;
}) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["search-accounts", keyword],
    queryFn:
      keyword !== ""
        ? ({ pageParam }) =>
            httpClient
              .get(
                `search/accounts?page=${pageParam}&limit=${limit}&userName=${keyword}`,
              )
              .json()
              .then(searchAccountSchema.parse)
        : skipToken,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const useGetAccountHints = ({ keyword }: { keyword: string }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["search-account-hints", keyword],
    queryFn:
      keyword !== ""
        ? ({ pageParam }) =>
            httpClient
              .get(
                `search/accounts?page=${pageParam}&limit=${3}&userName=${keyword}`,
              )
              .json()
              .then(searchAccountSchema.parse)
        : skipToken,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * 3;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const useGetPosts = ({
  limit,
  keyword,
  spec,
}: {
  limit: number;
  keyword: string;
  spec: boolean;
}) => {
  const httpClient = useHttpClient();
  const endpoint = spec ? "specTag" : "tag";
  return useInfiniteQuery({
    queryKey: ["search-posts", keyword],
    queryFn:
      keyword !== ""
        ? ({ pageParam }) =>
            httpClient
              .get(
                `search/${endpoint}?page=${pageParam}&limit=3&tag=${keyword}`,
              )
              .json()
              .then(searchPostSchema.parse)
        : skipToken,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const useGetSpecPosts = ({
  limit,
  keyword,
}: {
  limit: number;
  keyword: string;
}) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["search-spec-posts", keyword],
    queryFn:
      keyword !== ""
        ? ({ pageParam }) =>
            httpClient
              .get(`search/specTag?page=${pageParam}&limit=3&tag=${keyword}`)
              .json()
              .then(searchPostSchema.parse)
        : skipToken,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

type HashtagHints = {
  tags: Array<{ _id: string; postCount: number }>;
  totalCount: number;
};
export const useGetHashtagHints = (keyword: string) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery<HashtagHints, HTTPError>({
    queryKey: ["search-tag-hints", keyword],
    queryFn:
      keyword !== ""
        ? ({ pageParam }) =>
            httpClient
              .get(`search/Suggesttag?page=${pageParam}&limit=3&tag=${keyword}`)
              .json()
        : skipToken,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * 3;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

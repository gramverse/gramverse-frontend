import { skipToken, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { chatId, chatsResponseSchema, unreadCount } from "../types/chat";

export const useGetChatList = ({ limit }: { limit: number }) => {
  const httpClient = useHttpClient();
  return useInfiniteQuery({
    queryKey: ["chat-list"],
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get(`chats/chatList?page=${pageParam}&limit=${limit}`)
        .json()
        .then(chatsResponseSchema.parse),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const remaining = lastPage.totalCount - allPages.length * limit;
      if (remaining <= 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
    retry: 3,
  });
};

export const useGetMessageCount = () => {
  const httpClient = useHttpClient();
  return useQuery({
    queryKey: ["chatCount"],
    queryFn: () =>
      httpClient.get(`messages/unreadCount`).json().then(unreadCount.parse),
    refetchInterval: 120000,
  });
};

export const useGetChatId = (userName: string) => {
  const httpClient = useHttpClient();
  return useQuery({
    queryKey: ["chatId", userName],
    queryFn:
      userName !== ""
        ? () =>
            httpClient
              .get(`chats/getId?friendUserName=${userName}`)
              .json()
              .then(chatId.parse)
        : skipToken,
    refetchInterval: 120000,
  });
};

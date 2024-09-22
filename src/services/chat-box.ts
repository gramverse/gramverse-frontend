import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import {
  chatDetailSchema,
  chatResponseSchema,
} from "../types/chat-box";

export const useGetChatDetail = (chatId: string) => {
  //change to chatDetail
  const httpClient = useHttpClient();
  /////
  return useQuery({
    queryKey: ["getUnreadMessageCount", chatId],
    enabled: !!chatId,
    //queryFn: () => httpClient.get(`Message/unreadCount/${userName}`).json().then(z.number().parse),
    queryFn: () =>
      httpClient
        .get("messages/chatDetail/", {
          searchParams: { chatId },
        })
        .json()
        .then(chatDetailSchema.parse),
  });
};


export const useGetChatMessages = (
  userName: string,
  totalCount: number,
  chatId: string,
  limit: number,
) => {
  ///////////
  limit =10;
  //////////
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  return useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey:["GetChatMessages", userName],
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get("messages/messages", {
          searchParams: { page: pageParam, limit, chatId },
        })
        .json()
        .then(chatResponseSchema.parse);
    },
    enabled: totalCount > 0,
    initialPageParam: initialPageParam,
    getNextPageParam: (lastPage, pages) => {
      const totalPage = lastPage.totalCount / limit;
      
      return pages.length > totalPage
        ? undefined
        : initialPageParam + pages.length;
    },
  });
};

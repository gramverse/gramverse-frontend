import { io, Socket } from "socket.io-client";
import { useInView } from "react-intersection-observer";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  ChatMessage,
  chatMessageSchema,
  chatResponseSchema,
  MessageType,
} from "../../types/chat-box";
import { useState } from "react";
import { useCallback } from "react";
import { uniqueBy, sortBy, pipe } from "remeda";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../http-client";

export const useExchangeMessage = (
  friendUserName: string,
  totalCount: number,
  chatId: string,
  friendProfileImage: string,
) => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    setSocket(io());
    return () => {
      socket?.disconnect();
    };
  }, []);

  const [socketMessages, setSocketMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback(
    (content: string, type: MessageType, myUserName: string) => {
      if (!socket) return;

      socket.emit(
        `sendMessage`,
        {
          chatId,
          content,
          type: type,
        },
        (messageId: string) => {
          hasFocusAfterSend.current = false;
          const sentMessage: ChatMessage = {
            content,
            profileImage: friendProfileImage,
            seen: false,
            type,
            userName: myUserName,
            messageId,
            date: new Date(),
          };
          setSocketMessages((prev) => [...prev, sentMessage]);
        },
      );
    },
    [socket],
  );

  const seenMessage = useCallback(
    (hasSeenIds: string[], friendUserName: string) => {
      if (!socket) return;

      socket.emit("messageSeen", {
        idList: hasSeenIds,
        senderUserName: friendUserName,
      });
    },
    [socket],
  );
  useEffect(() => {
    if (!socket) return;

    const seenMessageHandler = (hasSeenIds: string[]) => {
      setSocketMessages((prev) => {
        const updated = prev.map((m) =>
          hasSeenIds.includes(m.messageId) ? { ...m, seen: true } : m,
        );
        return updated;
      });
    };

    socket.on(`receiveMessageSeen`, seenMessageHandler);
    return () => {
      socket.off("receiveMessageSeen", seenMessageHandler);
    };
  }, [socket, friendUserName]);

  useEffect(() => {
    if (!socket) return;

    const handler = (messageObj: unknown) => {
      const message = chatMessageSchema.parse(messageObj);

      const receiveMessage: ChatMessage = {
        content: message.content,
        messageId: message.messageId,
        profileImage: friendProfileImage,
        seen: message.seen,
        type: message.type,
        userName: message.userName,
        date: new Date(),
      };

      setSocketMessages((prev) => [...prev, receiveMessage]);
    };

    socket.on(`receiveMessage`, handler);
    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [socket, friendUserName]);

  const limit = 10;
  const httpClient = useHttpClient();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const hasInitialFocus = useRef(false);
  const hasFocusAfterSend = useRef(true);
  const [nearEndMessagesRef, isNearMessagesEnd] = useInView();
  const initialPageParam = 1;
  const {
    data: messageHistory,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ["GetChatMessages", friendUserName],
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

  useEffect(() => {
    if (!hasInitialFocus.current) return;

    if (!hasNextPage || !isNearMessagesEnd || isFetching) return;

    fetchNextPage();
  }, [isNearMessagesEnd, isFetchingNextPage, hasNextPage]);

  const dbMessages = messageHistory?.pages.flatMap((x) => x.messages) ?? [];
  const messages = pipe(
    [...dbMessages, ...socketMessages],
    uniqueBy(({ messageId }) => messageId),
    sortBy(({ date: date }) => date),
  );
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (!messages.length || hasInitialFocus.current || !lastMessageRef.current)
      return;
    hasInitialFocus.current = true;
    let lastUnseenIdx = [...messages]
      .reverse()
      .findIndex((m) => m.userName != friendUserName || m.seen);
    lastUnseenIdx = Math.max(0, lastUnseenIdx);
    lastUnseenIdx = messages.length - 1 - lastUnseenIdx;

    const el = document.querySelectorAll(".message")[lastUnseenIdx];
    el?.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [messages]);

  useLayoutEffect(() => {
    if (hasFocusAfterSend.current) return;
    if (lastMessage?.userName === friendUserName) return;
    hasFocusAfterSend.current = true;

    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, lastMessageRef.current]);

  return {
    messages,
    existHistory: hasNextPage,
    isLoading: hasNextPage && isFetchingNextPage,
    nearEndMessagesRef,
    sendMessage,
    seenMessage,
    lastMessageRef,
    socket,
  };
};

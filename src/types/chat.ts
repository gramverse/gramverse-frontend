import { z } from "zod";
export type Chat = {
  profileImage: string;
  userName: string;
  lastMessageTime: string;
  lastMessage: string;
  chatId: string;
  lastMessageType: "text" | "picture";
  unreadCount: number;
};

export const chat = z.object({
  profileImage: z.string(),
  userName: z.string(),
  lastMessageTime: z.string(),
  lastMessage: z.string(),
  chatId: z.string(),
  lastMessageType: z.union([z.literal("text"), z.literal("picture")]),
  unreadCount: z.number(),
});

export const chatsResponseSchema = z.object({
  chats: chat.array(),
  totalCount: z.number(),
});

export const unreadCount = z.object({
  unreadCount: z.number(),
});

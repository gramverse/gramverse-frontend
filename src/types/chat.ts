import { z } from "zod";

export const chat = z.object({
  profileImage: z.string(),
  userName: z.string(),
  lastMessageTime: z.string(),
  lastMessage: z.string(),
  _id: z.string(),
  lastMessageType: z.union([z.literal("text"), z.literal("image")]),
  unreadCount: z.number(),
});

export type Chat = z.infer<typeof chat>;
export const chatsResponseSchema = z.object({
  chats: chat.array(),
  totalCount: z.number(),
});

export const unreadCount = z.object({
  unreadCount: z.number(),
});

export const chatId = z.object({
  chatId: z.string(),
});

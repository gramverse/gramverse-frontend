import { z } from "zod";

export const chat = z.object({
  profileImage: z.string(),
  userName: z.string(),
  lastMessageTime: z.string(),
  lastMessage: z.string(),
  chatId: z.string(),
  lastMessageType: z.union([z.literal("text"), z.literal("picture")]),
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

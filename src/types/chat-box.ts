import { z } from "zod";

export const messageType = Object.freeze({
  text: "text",
  photo: "image",
});

export type MessageType = (typeof messageType)[keyof typeof messageType];

export const chatMessageSchema = z.object({
  chatId: z.string().optional(),
  messageId: z.string(),
  type: z.nativeEnum(messageType),
  userName: z.string(),
  content: z.string(),
  // content: z.string().or(z.instanceof(ArrayBuffer)),
  profileImage: z.string().optional(),
  seen: z.boolean(),
  date: z.coerce.date(),
});

export const chatDetailSchema = z.object({
  totalCount: z.number(),
  unreadCount: z.number(),
  profileImage: z.string(),
  friendUserName: z.string(),
});

export const chatResponseSchema = z.object({
  messages: chatMessageSchema.array(),
  totalCount: z.number(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type chatDetail = z.infer<typeof chatDetailSchema>;
export type ChatResponseType = z.infer<typeof chatResponseSchema>; //for test

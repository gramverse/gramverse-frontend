import { z } from "zod";

export const followingerInfoSchema = z.object({
  userName: z.string(),
  profileImage: z.string(),
  followerCount: z.number(),
});

export const followingerResponseSchema = z.object({
  followingers: followingerInfoSchema.array(),
  totalCount: z.number(),
});

export type FollowingerInfo = z.infer<typeof followingerInfoSchema>;

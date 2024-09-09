import { z } from "zod";
export const appUserInfoSchema = z.object({
  userName: z.string(),
  fullName: z.string(),
  bio: z.string(),
  followerCount: z.number(),
  followingCount: z.number(),
  postCount: z.number(),
});

export type appUserInfo = z.infer<typeof appUserInfoSchema>;

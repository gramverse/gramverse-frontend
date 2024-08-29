import { z } from "zod";

export const UserInfoSumarySchema = z.object({
  userName: z.string(),
  followerCount: z.number(),
  profileImage: z.string().optional(),
});

export type UserInfoSummary = z.infer<typeof UserInfoSumarySchema>;

export const UsersInfoSchema = UserInfoSumarySchema.array();

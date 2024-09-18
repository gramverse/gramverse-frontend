import { z } from "zod";

export const ProfileSchema = z.object({
  // _id: z.string().optional(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string(),
  email: z.string(),
  // passwordHash: z.string().optional(),
  isPrivate: z.boolean(),
  bio: z.string(),
  __v: z.number().optional(),
  followerCount: z.number(),
  followingCount: z.number(),
  postCount: z.number(),
});

export type Profile = z.infer<typeof ProfileSchema>;

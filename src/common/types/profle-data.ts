import { z } from "zod";

export const ProfileSchema = z.object({
  _id: z.string().optional(),
  userName: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImage: z.string().optional(),
  email: z.string().email(),
  passwordHash: z.string().optional(),
  isPrivate: z.boolean(),
  bio: z.string(),
  __v: z.number().optional(),
  followerCount :z.number(),
  followingCount: z.number(),
  postCount :z.number(),
});

export type Profile =  z.infer<typeof ProfileSchema>;

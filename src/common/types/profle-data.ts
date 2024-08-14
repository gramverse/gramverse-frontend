import { z } from "zod";

export const ProfileSchema = z.object({
  _id: z.string().optional(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string(),
  email: z.string().email(),
  passwordHash: z.string().optional(),
  isPrivate: z.boolean(),
  bio: z.string(),
  __v: z.number().optional(),
});

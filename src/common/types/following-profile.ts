// type ProfileDto = {
//     userName: string,
//     firstName: string,
//     lastName: string,
//     isPrivate: boolean,
//     profileImage: string,
//     bio: string,
//     isFollowed: boolean,
//     followerCount: number,
//     followingCount: number,
//     postCount: number,
// }

import { z } from "zod";

export const followingProfileSchema = z.object({
  userName: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  isPrivate: z.boolean(),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  followerCount: z.number(),
  followingCount: z.number(),
  postCount: z.number(),
  isFollowed: z.boolean(),
});

export type FollowingProfile = z.infer<typeof followingProfileSchema>;

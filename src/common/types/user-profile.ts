import { z } from "zod";

export const RequestStatus = Object.freeze({
  none: "none",
  pending: "pending",
  accepted: "accepted",
  declined: "declined",
});

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export const userProfileSchema = z.object({
  _id: z.string().optional(),
  userName: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  isPrivate: z.boolean(),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  followerCount: z.number(),
  followingCount: z.number(),
  postCount: z.number(),
  isBlocked: z.boolean(),
  hasBlockedUs: z.boolean(),
  isCloseFriend: z.boolean(),
  followRequestState: z.nativeEnum(RequestStatus),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

import { z } from "zod";

export const RequestStatus = Object.freeze({
  none: "none",
  pending: "pending",
  accepted: "accepted",
  declined: "declined",
});

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export const userProfileSchema = z.object({
  // _id: z.string().optional(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  isPrivate: z.boolean(),
  profileImage: z.string(),
  bio: z.string(),
  followerCount: z.number(),
  followingCount: z.number(),
  postCount: z.number(),
  isBlocked: z.boolean(),
  hasBlockedUs: z.boolean(),
  isCloseFriend: z.boolean(),
  followRequestState: z.union([
    z.literal("none"),
    z.literal("pending"),
    z.literal("accepted"),
    z.literal("declined"),
  ]),
  requestState: z.union([
    z.literal("none"),
    z.literal("pending"),
    z.literal("accepted"),
    z.literal("declined"),
  ]),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

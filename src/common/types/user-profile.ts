import { z } from "zod";

 export const requestStatus = Object.freeze({
  none: "none",
  unfollowed: "unfollowed",
  pending: "pending",
  accepted: "accepted",
  declined: "declined",
});

// type Stringable = { toString: () => string };

// const x: Stringable = 5;
// x.toString()

// type RequestStatusObjectType = typeof requestStatus;

// type Keys = keyof RequestStatusObjectType;

// export type requestStatus = RequestStatusObjectType[Keys]; //typee value enum
export type requestStatus = (typeof requestStatus)[keyof typeof requestStatus];

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
  followRequestState: z.nativeEnum(requestStatus),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

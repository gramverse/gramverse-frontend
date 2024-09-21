import { z } from "zod";
export const mention = z.object({
  type: z.literal("mention"),
  performerUserName: z.string(),
  postId: z.string(),
  postImage: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
});

export const like = z.object({
  type: z.literal("like"),
  performerUserName: z.string(),
  postId: z.string(),
  postImage: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
  postCreator: z.string(),
});

export const follow = z.object({
  type: z.literal("follow"),
  performerUserName: z.string(),
  followingUserName: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
});

export const followRequest = z.object({
  type: z.literal("followRequest"),
  performerUserName: z.string(),
  followingUserName: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
});

export const comment = z.object({
  type: z.literal("comment"),
  comment: z.string(),
  performerUserName: z.string(),
  postId: z.string(),
  postImage: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
  postCreator: z.string(),
});

export type Mention = z.infer<typeof mention>;

export type Like = z.infer<typeof like>;

export type Follow = z.infer<typeof follow>;

export type FollowRequest = z.infer<typeof followRequest>;

export type Comment = z.infer<typeof comment>;

export const myNotifications = z.object({
  notifications: z
    .union([mention, like, follow, comment, followRequest])
    .array(),
  totalCount: z.number(),
});
export type MyNotifications = z.infer<typeof myNotifications>;

export const userComment = z.object({
  type: z.literal("comment"),
  comment: z.string(),
  performerUserName: z.string(),
  postId: z.string(),
  postImage: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
  postCreator: z.string(),
});

export const userLike = z.object({
  type: z.literal("like"),
  performerUserName: z.string(),
  postId: z.string(),
  postImage: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
  postCreator: z.string(),
});

export const userFollow = z.object({
  type: z.literal("follow"),
  performerUserName: z.string(),
  followingUserName: z.string(),
  seen: z.boolean(),
  creationDate: z.string(),
});

export type UserComment = z.infer<typeof userComment>;
export type UserLike = z.infer<typeof userLike>;
export type UserFollow = z.infer<typeof userFollow>;

export const followingNotifications = z.object({
  notifications: z.union([userComment, userLike, userFollow]).array(),
  totalCount: z.number(),
});
export type FollowingNotifications = z.infer<typeof followingNotifications>;

export const unreadCount = z.object({
  unreadCount: z.number(),
});

import { z } from "zod";
export const account = z.object({
  profileImage: z.string(),
  followerCount: z.number(),
  userName: z.string(),
  followState: z.union([
    z.literal("accepted"),
    z.literal("pending"),
    z.literal("declined"),
    z.literal("none"),
  ]),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  _id: z.string(),
});

export const post = z.object({
  postId: z.string(),
  postImage: z.string(),
  userName: z.string(),
});

export type Account = z.infer<typeof account>;
export type Post = z.infer<typeof post>;

export const searchAccountSchema = z.object({
  users: account.array(),
  totalCount: z.number(),
});
export const searchPostSchema = z.object({
  posts: post.array(),
  totalCount: z.number(),
});

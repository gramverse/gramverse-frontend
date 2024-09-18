import { z } from "zod";

export const explorePostSchema = z.object({
  _id: z.string(),
  userName: z.string(),
  profileImage: z.string(),
  photoUrls: z.string().array(),
  caption: z.string(),
  mentions: z.string().array().optional(),
  tags: z.string().array().optional(),
  creationDate: z.string(),
  forCloseFriends: z.boolean(),
  likesCount: z.number(),
  bookmarksCount: z.number(),
  commentsCount: z.number(),
  isLiked: z.boolean(),
  isBookmarked: z.boolean(),
  followerCount: z.number(),
});

export const explorePostsResponseSchema = z.object({
  postDtos: explorePostSchema.array(),
  totalCount: z.number(),
});

export type ExplorePostInfo = z.infer<typeof explorePostSchema>;

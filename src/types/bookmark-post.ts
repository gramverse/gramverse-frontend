import { z } from "zod";

export const bookmarkPostSchema = z.object({
    postId: z.string(),
    userName: z.string(),
    photoUrl: z.string()
});

export const bookmarkPostsResponseSchema = z.object({
    posts: bookmarkPostSchema.array(),
    totalCount: z.number(),
  });

  export type BookmarkPostInfo = z.infer<typeof bookmarkPostSchema>;
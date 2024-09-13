import { z } from "zod";

export const mentionPostSchema = z.object({
    postId: z.string(),
    userName: z.string(),
    photoUrl: z.string()
});

export const mentionPostsResponseSchema = z.object({
    posts: mentionPostSchema.array(),
    totalCount: z.number(),
  });

  export type MentionPostInfo = z.infer<typeof mentionPostSchema>;
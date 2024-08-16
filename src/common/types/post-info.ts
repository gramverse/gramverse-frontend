import { z } from "zod";

export const PostInfoSchema = z.object({
  photos: z.string().url().array(),
  caption: z.string(),
  mentions: z.string().optional(),
  tags: z.string().array().optional(),
});

export type Post = z.infer<typeof PostInfoSchema>;

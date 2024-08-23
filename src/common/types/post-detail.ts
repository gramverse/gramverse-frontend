import { z } from "zod";

export const PostDetailSchema = z.object({
    _id: z.string(),
    photoUrls: z.string().array(),
    caption: z.string(),
    mentions: z.string().array().optional(),
    tags: z.string().array().optional(),
    creationDate: z.coerce.date(),
    isLiked: z.boolean(),
    isBookmarked: z.boolean(),
    likesCount: z.number(),
    bookmarksCount: z.number(),
    commentsCount: z.number(),
  });
  
  export type PostDetail = z.infer<typeof PostDetailSchema>;
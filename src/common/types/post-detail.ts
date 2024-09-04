import { z } from "zod";

export type CommentDto = {
  _id: string;
  userName: string;
  comment: string;
  postId: string;
  parentCommentId: string;
  creationDate: string;
  updateDate: string;
  isLiked: boolean;
  likesCount: number;
  childComments: CommentDto[];
};

export const PostDetailSchema = z.object({
  _id: z.string(),
  photoUrls: z.string().array(),
  caption: z.string(),
  mentions: z.string().array().optional(),
  tags: z.string().array().optional(),
  creationDate: z.string(),
  isLiked: z.boolean(),
  isBookmarked: z.boolean(),
  likesCount: z.number(),
  bookmarksCount: z.number(),
  commentsCount: z.number(),
});

export interface PostDetail extends z.infer<typeof PostDetailSchema> {}

export type Post = Pick<PostDetail, "_id" | "photoUrls" | "creationDate">;

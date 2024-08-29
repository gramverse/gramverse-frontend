import { z } from "zod";

export interface AddCommentData {
  postId: string;
  comment: string;
  parentCommentId: string;
  parentCommentUserName: string;
}
export interface LikeComment {
  isLike: boolean;
  commentId: string;
}

export type CommentFieldProps = {
  parentCommentId: string;
  parentCommentUserName: string;
};

export const SingleCommentResponseSchema: z.ZodType<CommentDto> = z.lazy(() =>
  z.object({
    _id: z.string(),
    postId: z.string(),
    userName: z.string(),
    comment: z.string(),
    likesCount: z.number(),
    isLiked: z.boolean(),
    creationDate: z.date(),
    parentCommentId: z.string(),
    parentCommentUserName: z.string(),
    childDtos: z.array(SingleCommentResponseSchema),
  }),
);
export type SingleComment = z.infer<typeof SingleCommentResponseSchema>;
export const CommentsArraySchema = SingleCommentResponseSchema.array();
export type CommentsArray = z.infer<typeof CommentsArraySchema>;

export const CommentsResponseSchema = z.object({
  comments: CommentsArraySchema,
  totalCount: z.number(),
});

export type CommentsResponse = z.infer<typeof CommentsResponseSchema>;

export type CommentDto = {
  _id: string;
  userName: string;
  postId: string;
  comment: string;
  parentCommentId: string;
  parentCommentUserName: string;
  creationDate: Date;
  likesCount: number;
  isLiked: boolean;
  childDtos: CommentDto[];
};

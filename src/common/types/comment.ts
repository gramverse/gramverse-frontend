export interface CommentData {
  postId: string;
  comment: string;
  parentCommentId: string;
}
export interface CommentProps extends Omit<CommentData, "comment"> {
  parentCommentUsername: string;
}

export interface CommentResponse {
  _id: string;
  postId: string;
  userName: string;
  comment: string;
  creationDate: string;
  parentCommentId: string;
}

export interface LikeComment {
  isLike: boolean;
  commentId: string;
}

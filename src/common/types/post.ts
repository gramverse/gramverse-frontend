import { z } from "zod";
export const PostFormDataSchema = z.object({
  photos: z
    .instanceof(FileList, { message: "فرمت فایل ها معتبر نیست" })
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => file.size < 1024 * 1024),
      { message: "حجم هر عکس باید کمتر از یک مگابایت باشد" },
    ),
  mentions: z.string().refine(
    (value) => {
      if (!value || value == "") return true;
      const mentions = value.match(/(@[A-Za-z0-9_]+)/g);
      return mentions?.length === 1;
    },
    { message: "لطفا فرمت منشن را رعایت کنید" },
  ),
});

export interface PostFormData {
  caption: string;
  mentions: Array<string>;
  photoURLs: Array<string>;
  photoFiles: File[];
}

export interface EditPostFormData extends PostFormData {
  _id: string;
}
export const PostSchema = z.object({
  _id: z.string(),
  photoUrls: z.string().array(),
  caption: z.string(),
  mentions: z.string().array().optional(),
  hashtags: z.string().array().optional(),
  creationDate: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const getPostsResponseSchema = PostSchema.array();

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

export type PostDetail = {
  _id: string;
  photoUrls: string[];
  caption: string;
  mentions: string[];
  tags: string[];
  creationDate: string;
  userName: string;
  comments: CommentDto[];
  commentsCount: number;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

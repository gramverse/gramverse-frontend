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
  forCloseFriends: z.boolean(),
});

export interface CreatePostFormData {
  caption: string;
  mentions: Array<string>;
  photoFiles: File[];
  forCloseFriends: boolean;
}

export interface EditPostFormData {
  caption: string;
  mentions: Array<string>;
  photoURLs: Array<string>;
  photoFiles: File[];
  forCloseFriends: boolean;
  _id: string;
}
export const PostSchema = z.object({
  _id: z.string(),
  photoUrls: z.string().array(),
  caption: z.string(),
  mentions: z.string().array().optional(),
  hashtags: z.string().array().optional(),
  creationDate: z.string(),
  forCloseFriends: z.boolean(),
});

export const getPostResponseSchema = z.object({
  posts: PostSchema.array(),
  totalCount: z.number(),
});

export const UserExists = z.object({
  exists: z.boolean(),
});

export type Post = z.infer<typeof PostSchema>;

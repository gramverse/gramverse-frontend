import { z } from "zod";

export const PostFormDataSchema = z.object({
  photos: z
    .instanceof(FileList, { message: "فرمت فایل ها معتبر نیست" })
    .refine((fileList) => fileList.length, {
      message: "حداقل یک عکس انتخاب کنید",
    })
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => file.size < 1024 * 1024),
      { message: "حجم هر عکس باید کمتر از یک مگابایت باشد" },
    ),
  caption: z
    .string()
    .max(500, { message: "کپشن نباید بیشتر از ۵۰۰ کاراکتر باشد" })
    .min(0),
  mentions: z.string().refine(
    (value) => {
      if (!value) return true;
      value.matchAll(/(@[A-Za-z0-9_]+)/g);
      const mentions = value.match(/(@[A-Za-z0-9_]+)/g);
      return mentions?.length === value.split(" ").length;
    },
    { message: "لطفا فرمت منشن را رعایت کنید" },
  ),
});

export interface PostFormData
  extends Omit<z.infer<typeof PostFormDataSchema>, "photos"> {
  photos: Array<string> | FileList;
}

export const PostSchema = z.object({
  id: z.number(),
  photoUrls: z.string().url().array(),
  caption: z.string(),
  mentions: z.string().array().optional(),
  hashtags: z.string().array().optional(),
  creationDate: z.coerce.date(),
});

export type Post = z.infer<typeof PostSchema>;

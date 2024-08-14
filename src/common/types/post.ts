import { z } from "zod";

export const PostSchema = z.object({
  photos: z
    .instanceof(FileList, { message: "فرمت فایل ها معتبر نیست" })
    .refine((fileList) => fileList.length, {
      message: "حداقل یک عکس انتخاب کنید",
    })
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => file.size < 1024 * 1024),
      { message: "حجم هر عکس باید کمتر از یک مگابایت باشد" }
    ),
  caption: z
    .string()
    .max(500, { message: "کپشن نباید بیشتر از ۵۰۰ کاراکتر باشد" })
    .min(0),
  mentions: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const mentions = value.match(/(@[A-Za-z0-9_]+)/g);
        return mentions != null && mentions.length > 0;
      },
      { message: "لطفا فرمت منشن را رعایت کنید" }
    ),
});

export type PostFormData = z.infer<typeof PostSchema>;

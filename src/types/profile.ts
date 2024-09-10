import { z } from "zod";

const profileCommonSchema = z.object({
  firstName: z
    .string()
    .max(20, "حداکثر طول نام 20 کاراکتر است")
    .regex(/^[\p{L} \u200c]+$/u, "نام تنها میتواند شامل حرف باشد")
    .or(z.literal("")),
  lastName: z
    .string()
    .max(20, "حداکثر طول نام خانوادگی 20 کاراکتر است")
    .regex(/^[\p{L} \u200c]+$/u, "نام خانوادگی تنها میتواند شامل حرف باشد")
    .or(z.literal("")),
  email: z.string().min(1, "ایمیل نباید خالی باشد").email("ایمیل نامعتبر است"),
  isPrivate: z.boolean(),
  bio: z.string(),
});

export const editProfileFormValueSchema = profileCommonSchema
  .partial()
  .extend({
    password: z
      .string()
      .regex(/[a-zA-Z]/, "رمز عبور باید شامل حروف باشد")
      .regex(/\d/, "رمز عبور باید شامل اعداد باشد")
      .min(8, "حداقل طول رمز عبور 8 کاراکتر است")
      .max(20, "حداکثر طول رمز عبور 20 کاراکتر است")
      .or(z.literal("")),
    confirmPassword: z.string(),
    profileImage: z
      .instanceof(FileList)
      .transform((files) => files[0])
      .pipe(
        z
          .instanceof(File)
          .optional()
          .refine((file) => !file || file.size < 1_000_000, {
            message: "حجم عکس باید کمتر از یک مگابایت باشد.",
          }),
      ),
  })
  .partial()
  .refine((data) => data.password === data.confirmPassword || !data.password, {
    message: "رمزهای عبور ورودی تطابق ندارند ",
    path: ["confirmPassword"],
  });

export const profileSchema = profileCommonSchema.extend({
  profileImage: z.string().url().nullish(),
});
export type ProfileFormValue = z.infer<typeof editProfileFormValueSchema>;

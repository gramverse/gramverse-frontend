import { z } from "zod";
export const ProfileFormValueSchema = z
  .object({
    name: z
      .string()
      .max(20, "حداکثر طول نام 20 کاراکتر است")
      .regex(/[a-zA-Z]/, "نام تنها میتواند شامل حرف باشد")
      .optional(),
      lastName: z
      .string()
      .max(20, "حداکثر طول نام خانوادگی 20 کاراکتر است")
      .regex(/[a-zA-Z]/, "نام خانوادگی تنها میتواند شامل حرف باشد")
      .optional(),
    email: z.string()
    .min(1, "ایمیل نباید خالی باشد")
    .email("ایمیل نامعتبر است"),
    password: z
      .string()
      .min(1, "رمز عبور نباید خالی باشد")
      .regex(/[a-zA-Z]/, "رمز عبور باید شامل حروف باشد")
      .regex(/\d/, "رمز عبور باید شامل اعداد باشد")
      .min(8, "حداقل طول رمز عبور 8 کاراکتر است")
      .max(20, "حداکثر طول رمز عبور 20 کاراکتر است"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور ورودی تطابق ندارند ",
    path: ["confirmPassword"],
  });

export type ProfileFormValue = z.infer<typeof ProfileFormValueSchema>;


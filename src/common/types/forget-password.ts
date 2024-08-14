import { z } from "zod";

export const forgetPassFormValueSchema = z.object({
  emailOrUserName: z.union([
    z
      .string()
      .min(1,"نام کاربری  یا ایمیل نباید خالی باشد")
      .min(6, "حداقل طول نام کاربری 6 کاراکتر است")
      .max(20, "حداکثر طول نام کاربری 20 کاراکتر است")
      .regex(/^[\w.]+$/, "نام کاربری تنها میتواند شامل حرف، عدد و نقطه باشد"),
    z.string().min(1,"نام کاربری  یا ایمیل نباید خالی باشد").email("ایمیل نامعتبر است"),
  ]),
});

export type forgetPassFormValue = z.infer<typeof forgetPassFormValueSchema>;


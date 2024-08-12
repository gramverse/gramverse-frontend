import { z } from "zod";
const signupFormValueSchema = z
  .object({
    username: z
      .string()
      .min(1, "نام کاربری نباید خالی باشد")
      .min(6, "حداقل طول نام کاربری 6 کاراکتر است")
      .max(20, "حداکثر طول نام کاربری 20 کاراکتر است")
      .regex(/^[\w.]+$/, "نام کاربری تنها میتواند شامل حرف، عدد و نقطه باشد"),
    email: z
      .string()
      .min(1, "ایمیل نباید خالی باشد")
      .includes("@", { message: "ایمیل باید شامل @ باشد" })
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

type SignupFormValue = z.infer<typeof signupFormValueSchema>;

export { signupFormValueSchema };
export type { SignupFormValue };

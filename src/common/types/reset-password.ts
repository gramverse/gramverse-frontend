import { z } from "zod";
const resetPasswordSchema = z
  .object({
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

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export { resetPasswordSchema };
export type { ResetPasswordFormData };

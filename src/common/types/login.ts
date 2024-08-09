import { z } from "zod";
const loginSchema = z.object({
  emailOrUsername: z.union([
    z
      .string()
      .min(1, { message: "این فیلد نباید خالی باشد" })
      .min(6, "حداقل طول نام کاربری 6 کاراکتر است")
      .max(20, "حداکثر طول نام گاربری 20 کاراکتر است")
      .regex(/^[\w.]+$/, "نام کاربری تنها میتواند شامل حرف، عدد و نقطه باشد"),
    z.string().email("ایمیل نامعتبر است"),
  ]),
  password: z
    .string()
    .min(1, { message: "این فیلد نباید خالی باشد" })
    .regex(/[a-zA-Z]/, "رمز عبور باید شامل حروف باشد")
    .regex(/\d/, "رمز عبور باید شامل اعداد باشد")
    .min(8, "حداقل طول رمزعبور 8 کاراکتر است")
    .max(20, "حداکثر طول رمزعبور 20 کاراکتر است"),
  rememberMe: z.boolean(),
});

export interface LoginFormData {
  type: "login";
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export { loginSchema };

import { z } from "zod";
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, { message: "این فیلد نباید خالی باشد" }),
  password: z
    .string()
    .min(1, { message: "این فیلد نباید خالی باشد" })
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

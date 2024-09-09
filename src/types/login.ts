import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, { message: "این فیلد نباید خالی باشد" }),
  password: z
    .string()
    .min(1, { message: "این فیلد نباید خالی باشد" })
    .max(20, "حداکثر طول رمزعبور 20 کاراکتر است"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginResponse = z.object({
  userName: z.string(),
});

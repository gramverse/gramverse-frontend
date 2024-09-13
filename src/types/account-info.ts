import { z } from "zod";

export const accountInfoSchema = z.object({
  userName: z.string(),
  profileImage: z.string().optional(),
});

export const accountListResponseSchema = z.object({
  accounts: accountInfoSchema.array()
});

export type AccountDetail = z.infer<typeof accountInfoSchema>;
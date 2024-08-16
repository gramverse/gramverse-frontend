import { z } from "zod";

export const errorMessages: Record<number, string> = {
  1001: "شما دسترسی ندارید",
  1002: "نام‌ کاربری اشتباه است",
  1003: "رمز عبور اشتباه است",
  1004: "ایمیل اشتباه است",
  1005: "اینک به ایمیل شما ارسال شد",
  1006: "لینک به ایمیل شما ارسال شد",
  1007: "ثبت نام ناموفق بود",
  1008: "خطا",
};

export const errorResponseSchema = z.object({
  statusCode: z.number().int(),
  errorCode: z.number().int(),
});

// export enum ErrorCode {
//   UNAUTHORIZED = 1001,
//   INVALID_USERNAME = 1002,
//   INVALID_PASSWORD = 1003,
//   INVALID_EMAIL = 1004,
//   EMAIL_EXISTS = 1005,
//   USERNAME_EXISTS = 1006,
//   UNSUCCESSFUL_SIGNUP = 1007,
//   UNKNOWN_ERROR = 1008,
// }

// export const ErrorCode =  Object.freeze({
//   UNAUTHORIZED: 1001,
//   INVALID_USERNAME: 1002,
//   INVALID_PASSWORD: 1003,
//   INVALID_EMAIL: 1004,
//   EMAIL_EXISTS: 1005,
//   USERNAME_EXISTS: 1006,
//   UNSUCCESSFUL_SIGNUP: 1007,
//   UNKNOWN_ERROR: 1008,
// })
// export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

// type TErrCode = typeof ErrorCode;
// type A = TErrCode['UNAUTHORIZED' | 'EMAIL_EXISTS']
// type Keys = keyof TErrCode;
// export type ErrorCode = (TErrCode)[Keys]


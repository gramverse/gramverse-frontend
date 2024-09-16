import { z } from "zod";

export const errorResponseSchema = z.object({
  statusCode: z.number().int(),
  errorCode: z.number().int(),
});

export const errorMessages: Record<string, string> = {
  UNAUTHORIZED:"شما دسترسی ندارید." ,
  INVALID_USERNAME:"نام‌ کاربری نامعتبر است",
  INVALID_PASSWORD:"رمز عبور نامعتبر است",
  INVALID_EMAIL:"ایمیل نامعتبر است.",
  EMAIL_EXISTS:"ایمیل تکراری است",
  USERNAME_EXISTS:"نام کاربری تکراری است",
  UNSUCCESSFUL_SIGNUP:"ثبت نام ناموفق",
  UNKNOWN_ERROR:"خطای ناشناخته",
  USER_NOT_FOUND:"کاربر مورد نظر یافت نشد",
  INVALID_USERNAME_OR_PASSWORD:"نام کاربری یا پسورد نامعتبر است",
  INVALID_OR_EXPIRED_TOKEN:"زمان حضور در سایت به پایان رسیده است. لطفا مجددا وارد شوید",
  MISSING_FOLLOWING_USERNAME:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  INVALID_FOLLOWING_USERNAME:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  MISSING_PHOTO_FOR_POST:"پست باید حداقل یک عکس داشته باشد",
  FILE_TOO_LARGE:"فایل بارگداری شده از حد مجاز بزرگتر است",
  FILE_UPLOAD_ERROR:"خطا در بارگداری فایل",
  PHOTO_COUNT_EXCEDED:"پست حداکثر ده عکس میتواند داشته باشد",
  POST_NOT_FOUND:"پست مورد نظر یافت نشد",
  COMMENT_NOT_FOUND:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  MISSING_LIKE_POSTID:"اطلاعات پست ناموجوداست",
  MISSING_LIKE_COMMENTID:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  MISSING_BOOKMARK_POSTID:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  COMMENT_INVALID_PARENT_ID:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  INVALID_POST_ID:"پست یافت نشد",
  YOU_ARE_BLOCKED:"شما به این محتوا دسترسی ندارید.",
  CREATOR_IS_BLOCKED_BY_YOU:"شما به این محتوا دسترسی ندارید",
  USER_IS_PRIVATE:"پیح کاربر خصوصی است",
  EDIT_POST_ACCESS_DENIED:"اجازه ویرایش پست را ندارید",
  USER_IS_NOT_FOLLOWED:"باید کاربر را فالو کنید",
  INVALID_ACCEPTED_ARGUMENT:"خطا در ارسال اطلاعات، لطفا به پشتیبانی اطلاع دهید",
  NO_SUCH_REQUEST:"کاربر درخواست خود را لغو کرده است",
  ALREADY_ACCEPTED:"این درخواست از قبل پذبرفته شده است",
  MISSING_FOLLOWER_USERNAME:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  INVALID_FOLLOW_REQUEST:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  MISSING_COMMENTID:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  MISSING_POSTID:"خطا در ارسال اطلاعات، به پشتیبانی اطلاع دهید.",
  SWITCH_ACCOUNT_ERROR:"خطا در تغییر اکانت",
  PAGE_NOT_FOUND:"آدرس مورد نظر یافت نشد",
  TOO_MANY_ACCOUNTS:"سقف حساب کاربری شما پر شده است، لطفا از یکی از حساب های خود خارج شوید",
 };

export enum ErrorCode {
  // Missing field:
  MISSING_FOLLOWING_USERNAME =0,
  MISSING_FOLLOWER_USERNAME,
  MISSING_COMMENTID,
  MISSING_POSTID,

  // Invalid field value:
  INVALID_USERNAME,
  INVALID_PASSWORD,
  INVALID_EMAIL,
  INVALID_FOLLOWING_USERNAME,
  INVALID_POST_ID,
  INVALID_ACCEPTED_ARGUMENT,
  COMMENT_INVALID_PARENT_ID,

  // Logic validation errors:
  EMAIL_EXISTS,
  USERNAME_EXISTS,
  INVALID_OR_EXPIRED_TOKEN,
  MISSING_PHOTO_FOR_POST,
  PHOTO_COUNT_EXCEDED,
  NO_SUCH_REQUEST,
  ALREADY_ACCEPTED,
  INVALID_FOLLOW_REQUEST,

  // File errors:
  FILE_TOO_LARGE,
  FILE_UPLOAD_ERROR,

  // Authorization/authentication errors:
  UNAUTHORIZED,
  INVALID_USERNAME_OR_PASSWORD,
  SWITCH_ACCOUNT_ERROR,

  // forbidden errors:
  USER_IS_NOT_FOLLOWED,
  YOU_ARE_BLOCKED,
  EDIT_POST_ACCESS_DENIED,
  CREATOR_IS_BLOCKED_BY_YOU,
  USER_IS_PRIVATE,

  // Not found errors:
  COMMENT_NOT_FOUND,
  PAGE_NOT_FOUND,
  POST_NOT_FOUND,
  USER_NOT_FOUND,

  // Unknown error:
  UNKNOWN_ERROR,

  // New errors:
  TOO_MANY_ACCOUNTS,
}



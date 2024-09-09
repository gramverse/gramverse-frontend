import { HTTPError, TimeoutError } from "ky";
import { toast } from "sonner";
import {
  ErrorCode,
  errorMessages,
  errorResponseSchema,
} from "../../assets/constants/error-messages";

export const handleRequestError = async (error: Error) => {
  if (error instanceof TimeoutError) {
    toast.error("تاخیر در پاسخ سرور");
    return;
  }

  if (!(error instanceof HTTPError)) {
    const message = error instanceof Error ? error.message : String(error);
    toast.error(message);
    return;
  }

  const responseBody = await error?.response?.clone()?.json();
  const result = errorResponseSchema.safeParse(responseBody);
  if (!result.success) {
    return console.error(responseBody);
  }
  const { errorCode, statusCode } = result.data;

  if (statusCode && statusCode === 403) {
    toast.error("شما به این محتوا دسترسی ندارید ");
  } else if (statusCode && statusCode === 500) {
    toast.error("خطایی رخ داده است");
  }
  const userMessage =
    errorMessages[ErrorCode[errorCode]] ?? `خطای ناشناخته: "${errorCode}"`;
  toast.error(userMessage);
};

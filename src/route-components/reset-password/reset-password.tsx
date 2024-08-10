import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../common/types/reset-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import background from "../../assets/svg/background.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@mui/material";
import { Key } from "../../assets/svg/key";
import { useConfirmResetPassword } from "../../api-hooks/reset-password";
import { InputField } from "../../reusable-components/input-field";
import { SubmitBtn } from "../../reusable-components/submit-btn";

import { useLocation } from "react-router-dom";
import { useResetPassword } from "../../api-hooks/reset-password";
import { useEffect } from "react";
// import { errorMessages } from "../../common/error-messages";

const ResetPassWordComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    criteriaMode: "all",
    resolver: zodResolver(resetPasswordSchema),
  });
  const location = useLocation();
  const { mutate: ConfirmMutate } = useResetPassword();
  useEffect(() => {
    ConfirmMutate(location.pathname);
  });

  const { error, isError, mutate } = useConfirmResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex bgColor flex-col items-center justify-center h-full w-fit">
      <img src={rahnemaLogo} alt="" />
      <p className="leading-5 font-semibold"> تنظیم رمز عبور جدید </p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        {isError && <Alert severity="error">{error.message}</Alert>}

        <p className="w-80 text-sm leading-6 text-right">
          لطفاً رمز جدیدی برای حساب خود انتخاب کنید:{" "}
        </p>
        <InputField
          placeholder="رمز عبور"
          type="password"
          error={errors.password}
          svg={Key}
          {...register("password")}
        />
        <InputField
          placeholder="تکرار رمز عبور"
          type="password"
          error={errors.confirmPassword}
          svg={Key}
          {...register("confirmPassword")}
        />
        <div className="flex flex-row justify-end gap-5">
          <SubmitBtn className="w-48" size="medium">
            ثبت رمز عبور جدید{" "}
          </SubmitBtn>
        </div>
      </form>
    </div>
  );
};

export const ResetPassWord = () => {
  return (
    <div
      className="w-full h-screen overflow-hidden bgColor flex justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        // backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[485px] bgColor py-28 rounded-3xl h-fit flex justify-center items-center">
        <ResetPassWordComponent></ResetPassWordComponent>
      </div>
    </div>
  );
};

export const ResetPassWordMobile = () => {
  return (
    <>
      <div className="h-screen bgColor overflow-hidden h- w-fit p-10 flex flex-col justify-center items-center">
        <ResetPassWordComponent></ResetPassWordComponent>
      </div>
    </>
  );
};

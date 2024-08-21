import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../common/types/reset-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "../../reusable-components/alert";
import Key from "../../assets/svg/key.svg";
import {
  useResetPassword,
  useValidateResetToken,
} from "../../api-hooks/reset-password";
import { InputField } from "../../reusable-components/input-field";
import { Button } from "../../reusable-components/button";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CollegeBackground } from "../../reusable-components/rahnema-background";
import {
  ContainterMobile,
  ContainterWeb,
} from "../../reusable-components/container";
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
  const { token } = useParams();
  const { mutate: mutateToken } = useValidateResetToken();

  useEffect(() => {
    mutateToken(token ?? "");
  }, [mutateToken, token]);

  const { error, mutate } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (formData) => {
    mutate({
      newPassword: formData.password,
      token: token ?? "",
    });
  };

  return (
    <div className="flex h-full w-fit flex-col items-center justify-center bg-primary">
      <img src={rahnemaLogo} alt="" />
      <p className="font-semibold leading-5"> تنظیم رمز عبور جدید </p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <Alert status="error" message={error?.message} />

        <p className="w-80 text-right text-sm leading-6">
          لطفاً رمز جدیدی برای حساب خود انتخاب کنید:{" "}
        </p>
        <InputField
          placeholder="رمز عبور"
          type="password"
          error={errors.password?.message}
          svg={Key}
          {...register("password")}
        />
        <InputField
          placeholder="تکرار رمز عبور"
          type="password"
          error={errors.confirmPassword?.message}
          svg={Key}
          {...register("confirmPassword")}
        />
        <div className="flex flex-row justify-end gap-5">
          <Button classes="w-48" size="medium">
            ثبت رمز عبور جدید
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ResetPassWord = () => {
  return (
    <CollegeBackground>
      <ContainterWeb>
        <ResetPassWordComponent></ResetPassWordComponent>
      </ContainterWeb>
    </CollegeBackground>
  );
};

export const ResetPassWordMobile = () => {
  return (
    <>
      <ContainterMobile>
        <ResetPassWordComponent></ResetPassWordComponent>
      </ContainterMobile>
    </>
  );
};

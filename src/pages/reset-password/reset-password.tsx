import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../types/reset-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "@asset/svg/rahnema-logo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Key from "@asset/svg/key.svg";
import {
  useResetPassword,
  useValidateResetToken,
} from "../../services/reset-password";
import { InputField } from "../../components/input-field";
import { Button } from "../../components/button";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ContainterMobile, ContainterWeb } from "../../components/container";

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

  const { mutate, isPending } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (formData) => {
    mutate({
      newPassword: formData.password,
      token: token ?? "",
    });
  };

  return (
    <div className="flex h-[800px] w-[400px] flex-col items-center justify-center bg-primary">
      <img src={rahnemaLogo} alt="" />
      <p className="font-semibold leading-5"> تنظیم رمز عبور جدید </p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
          <Button classes="w-48" size="medium" disabled={isPending}>
            ثبت رمز عبور جدید
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ResetPassWord = () => {
  return (
    <ContainterWeb>
      <ResetPassWordComponent></ResetPassWordComponent>
    </ContainterWeb>
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

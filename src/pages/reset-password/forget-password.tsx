import { forgetPassFormValue } from "../../types/forget-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "@asset/svg/rahnema-logo.svg";
import PersonIcon from "@asset/svg/profile.svg";
import { useForgetPassword } from "../../services/forget-password";
import { InputField } from "../../components/input-field";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { urls } from "../../router/routes";
import { ContainterMobile, ContainterWeb } from "../../components/container";

const ForgetPasswordLayout = () => {
  const { register, handleSubmit } = useForm<forgetPassFormValue>({});
  const navigate = useNavigate();
  const { mutate, isPending } = useForgetPassword();

  const onSubmit: SubmitHandler<forgetPassFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex h-[600px] w-[300px] flex-col items-center justify-center gap-5 bg-primary">
      <img src={rahnemaLogo} alt="" />
      <p className="font-semibold leading-5">بازیابی رمز عبور</p>
      <form
        className="flex flex-col items-center justify-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="w-80 text-right text-sm leading-6">
          لطفاً نام‌ کاربری یا ایمیل خودتون رو وارد کنید:
        </p>
        <InputField
          placeholder="نام‌ کاربری یا ایمیل "
          svg={PersonIcon}
          {...register("email")}
        />
        <div className="flex flex-row items-center justify-end gap-5 self-end">
          <Button
            btnColor="transparent"
            onClick={() => {
              navigate(urls.login);
            }}
          >
            انصراف
          </Button>
          <Button type={"submit"} size="medium" disabled={isPending}>
            ارسال لینک بازیابی رمز عبور
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ForgetPassword = () => {
  return (
    <ContainterWeb className="px-20">
      <ForgetPasswordLayout></ForgetPasswordLayout>
    </ContainterWeb>
  );
};

export const ForgetPasswordMobile = () => {
  return (
    <>
      <ContainterMobile>
        <ForgetPasswordLayout></ForgetPasswordLayout>
      </ContainterMobile>
    </>
  );
};

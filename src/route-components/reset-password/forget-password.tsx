import { forgetPassFormValue } from "../../common/types/forget-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import PersonIcon from "../../assets/svg/profile.svg";
import { Alert } from "../../reusable-components/alert";
import { useForgetPassword } from "../../api-hooks/forget-password";
import { InputField } from "../../reusable-components/input-field";
import { Button } from "../../reusable-components/button";
import { Link } from "react-router-dom";
import { urls } from "../../common/routes";
import { CollegeBackground } from "../../reusable-components/rahnema-background";
import {
  ContainterMobile,
  ContainterWeb,
} from "../../reusable-components/container";
// import { errorMessages } from "../../common/error-messages";

const ForgetPasswordLayout = () => {
  const { register, handleSubmit } = useForm<forgetPassFormValue>({});

  const { error, mutate } = useForgetPassword();

  const onSubmit: SubmitHandler<forgetPassFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex bgColor flex-col items-center justify-center w-fit gap-5 py-20">
      <img src={rahnemaLogo} alt="" />
      <p className="leading-5 font-semibold">بازیابی رمز عبور</p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
       <Alert status="error" message={error?.message} />

        <p className="w-80 text-sm leading-6 text-right">
          لطفاً نام‌ کاربری یا ایمیل خودتون رو وارد کنید:
        </p>
        <InputField
          placeholder="نام‌ کاربری یا ایمیل "
          svg={PersonIcon}
          {...register("email")}
        />
        <div className="flex flex-row justify-end items-center gap-5">
          <Link className="no-underline	" to={urls.login}>
            انصراف
          </Link>
          <Button type={"submit"} size="medium">
            ارسال لینک بازیابی رمز عبور
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ForgetPassword = () => {
  return (
    <CollegeBackground>
      <ContainterWeb>
        <ForgetPasswordLayout></ForgetPasswordLayout>
      </ContainterWeb>
    </CollegeBackground>
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

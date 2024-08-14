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

const ForgetPasswordLayout = () => {
  const { register, handleSubmit } = useForm<forgetPassFormValue>({});

  const { isError, error, mutate } = useForgetPassword();

  const onSubmit: SubmitHandler<forgetPassFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex bgColor flex-col items-center justify-center h-full w-fit">
      <img src={rahnemaLogo} alt="" />
      <p className="leading-5 font-semibold">بازیابی رمز عبور</p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        {isError && <Alert status="error" message={error.message} />}

        <p className="w-80 text-sm leading-6 text-right">
          لطفاً نام‌ کاربری یا ایمیل خودتون رو وارد کنید:
        </p>
        <InputField
          placeholder="نام‌ کاربری یا ایمیل "
          svg={PersonIcon}
          {...register("emailOrUserName")}
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
      <div className="w-[485px] bgColor py-28 rounded-3xl h-fit flex justify-center items-center">
        <ForgetPasswordLayout></ForgetPasswordLayout>
      </div>
    </CollegeBackground>
  );
};

export const ForgetPasswordMobile = () => {
  return (
    <>
      <div className="h-screen bgColor  w-fit p-10 flex flex-col justify-center items-center">
        <ForgetPasswordLayout></ForgetPasswordLayout>
      </div>
    </>
  );
};

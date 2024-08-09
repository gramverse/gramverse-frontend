import {
  forgetPassFormValue,
  forgetPassFormValueSchema,
} from "../../common/types/forget-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import background from "../../assets/svg/background.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@mui/material";
import { useForgetPassword } from "../../api-hooks/ForgetPassword";
import { InputField } from "../../reusable-components/input-field";
import { PersonIcon } from "../../assets/svg/person-icon";
import { SubmitBtn } from "../../reusable-components/submit-btn";
import { useNavigate } from "react-router-dom";
import { urls } from "../../common/routes";
import { CancelBtn } from "../../reusable-components/cancel-btn";

const ForgetPasswordLayout = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgetPassFormValue>({
    criteriaMode: "all",
    resolver: zodResolver(forgetPassFormValueSchema),
  });

  const { isError, error, mutate } = useForgetPassword();

  const onSubmit: SubmitHandler<forgetPassFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex bgColor flex-col items-center justify-center h-full w-fit">
      <img src={rahnemaLogo} alt="" />
      <p className="leading-5 font-semibold">بازیابی رمز عبور</p>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        {isError && <Alert severity="error">{error.message}</Alert>}

        <p className="w-80 text-sm leading-6 text-right">
          لطفاً نام‌ کاربری یا ایمیل خودتون رو وارد کنید:
        </p>
        <InputField
          placeholder="نام‌ کاربری یا ایمیل "
          error={errors.emailOrUsername}
          svg={PersonIcon}
          {...register("emailOrUsername")}
        />
        <div className="flex flex-row justify-end gap-5">
          <CancelBtn onClick={() => navigate(urls.main + urls.login)}>
            انصراف
          </CancelBtn>
          <SubmitBtn className="w-48" size="medium">
            ارسال لینک بازیابی رمز عبور
          </SubmitBtn>
        </div>
      </form>
    </div>
  );
};

export const ForgetPassword = () => {
  return (
    <div
      className="w-full h-screen overflow-hidden bgColor flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-[485px] py-28 bgColor rounded-3xl h-fit flex justify-center items-center">
        <ForgetPasswordLayout></ForgetPasswordLayout>
      </div>
    </div>
  );
};

export const ForgetPasswordMobile = () => {
  return (
    <>
      <div className="h-screen bgColor overflow-hidden h- w-fit p-10 flex flex-col justify-center items-center">
        <ForgetPasswordLayout></ForgetPasswordLayout>
      </div>
    </>
  );
};

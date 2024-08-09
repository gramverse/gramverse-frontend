import {
  forgetPassFormValue,
  forgetPassFormValueSchema,
} from "../../common/types/forget-password";
import { SubmitHandler, useForm } from "react-hook-form";
import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import background from "../../assets/svg/background.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "@mui/material";
import { useForgetPassword } from "../../api-hooks/ForgetPassword";
import { InputField } from "../../reusable-components/input-field";
import { PersonIcon } from "../../assets/svg/person-icon";
import { SubmitBtn } from "../../reusable-components/submit-btn";
import { useNavigate } from "react-router-dom";
import { urls } from "../../common/routes";
import { CancelBtn } from "../../reusable-components/cancel -btn";

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
    <div
    className="w-full h-screen bg-white"
    style={{ backgroundImage: `url(${background})` }}
    >
  
      {{ isError } && <Alert severity="error">{error?.message}</Alert>}
      <div className="w-3/12 flex justify-center items-center  m-auto rounded-3xl py-16 gap-8 border-solid border-form-border mt-44">
        <div className="flex flex-col w-80 h-96 gap-12 m-auto">
          <div className="flex flex-col items-center gap-10 h-32">
            <div className="w-24 h-16">
              <img src={rahnemaLogo} alt="" />
            </div>
            <div className="w-80 h-5 gap-8 text-center">
              <p className="leading-5 font-semibold">بازیابی رمز عبور</p>
            </div>
          </div>
          <form
            className="flex flex-col w-80 h-40 gap-8"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="w-80 text-sm leading-6 text-right">
              لطفاً نام‌ کاربری یا ایمیل خودتون رو وارد کنید:
            </p>
            <InputField
              placeholder="نام‌ کاربری یا ایمیل "
              error={errors.emailOrUsername}
              svg={PersonIcon}
              {...register("emailOrUsername")}
            />
            <div className="flex flex-row justify-end w-80 h-9 gap-2">
              <CancelBtn onClick={() => navigate(urls.main + urls.login)}>
                انصراف
              </CancelBtn>
              <SubmitBtn className="w-48" size="medium">
                ارسال لینک بازیابی رمز عبور
              </SubmitBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const ForgetPassword = () => {
  return <ForgetPasswordLayout></ForgetPasswordLayout>;
};

export const ForgetPasswordMobile = () => {
  return <ForgetPasswordLayout></ForgetPasswordLayout>;
};

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@mui/material";
import {
  SignupFormValue,
  signupFormValueSchema,
} from "../common/types/sign-up";
import { useSignup } from "../api-hooks/sign-up";
import { Key } from "../assets/svg/key.tsx";
import { InputField } from "../reusable-components/input-field";
import { Envelope } from "../assets/svg/envelope.tsx";
import { PersonIcon } from "../assets/svg/person-icon.tsx";
import { SubmitBtn } from "../reusable-components/submit-btn.tsx";

const SignUpLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValue>({
    criteriaMode: "all",
    resolver: zodResolver(signupFormValueSchema),
  });
  const { isError, error, mutate } = useSignup();

  const onSubmit: SubmitHandler<SignupFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <form
      className="flex flex-col gap-y-8 w-80 m-auto p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isError && <Alert severity="error">{error?.message}</Alert>}
      <div dir="rtl">
        <p className="text-sm leading-6 text-right w-80">
          برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید :
        </p>

        <div className="flex flex-col gap-y-6">
          <InputField
            placeholder="نام کاربری"
            error={errors.username}
            svg={PersonIcon}
            {...register("username")}
          />
          <InputField
            type="email"
            placeholder="ایمیل"
            error={errors.email}
            svg={Envelope}
            {...register("email")}
          />
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
        </div>
      </div>
      <SubmitBtn size="medium">ثبت‌ نام</SubmitBtn>
    </form>
  );
};

export const Signup = () => {
   return <SignUpLayout></SignUpLayout>;
};

export const SignupMoblie = () => {
  return <SignUpLayout></SignUpLayout>;
};

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "../reusable-components/alert.tsx";
import {
  SignupFormValue,
  signupFormValueSchema,
} from "../common/types/sign-up";
import { useSignup } from "../api-hooks/sign-up";
import { InputField } from "../reusable-components/input-field";
import { Button } from "../reusable-components/button.tsx";
import PersonIcon from "../assets/svg/profile.svg";
import Key from "../assets/svg/key.svg";
import Envelope from "../assets/svg/envelope.svg";

const SignUpLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValue>({
    criteriaMode: "all",
    resolver: zodResolver(signupFormValueSchema),
  });
  const { error, mutate } = useSignup();

  const onSubmit: SubmitHandler<SignupFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <form
      className="bgColor m-auto flex w-80 flex-col gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Alert status="error" message={error?.message} />
      <div dir="rtl">
        <p className="mb-7 text-right text-xs font-extralight leading-loose">
          به کالج‌گرام خوش آمدید. برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز
          عبور وارد کنید :
        </p>

        <div className="flex flex-col gap-y-5">
          <InputField
            placeholder="نام کاربری"
            error={errors.userName?.message}
            svg={PersonIcon}
            {...register("userName")}
          />
          <InputField
            type="email"
            placeholder="ایمیل"
            error={errors.email?.message}
            svg={Envelope}
            {...register("email")}
          />
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
        </div>
      </div>
      <Button type="submit" classes="self-end">
        ثبت‌ نام
      </Button>
    </form>
  );
};

export const Signup = () => {
  return <SignUpLayout></SignUpLayout>;
};

export const SignupMoblie = () => {
  return <SignUpLayout></SignUpLayout>;
};

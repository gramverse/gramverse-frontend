import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValue, signupFormValueSchema } from "../../types/sign-up.ts";
import { useSignup } from "../../services/sign-up.ts";
import { InputField } from "../../components/input-field.tsx";
import { Button } from "../../components/button.tsx";
import PersonIcon from "@asset/svg/profile.svg";
import Key from "@asset/svg/key.svg";
import Envelope from "@asset/svg/envelope.svg";

const SignUpLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValue>({
    criteriaMode: "all",
    mode: "onChange",
    resolver: zodResolver(signupFormValueSchema),
  });
  const { mutate, isPending } = useSignup();

  const onSubmit: SubmitHandler<SignupFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <form
      className="m-auto flex grow flex-col items-center gap-y-2 bg-primary"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="mb-7 text-right text-xs font-extralight leading-loose">
        به کالج‌گرام خوش آمدید. برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز
        عبور وارد کنید :
      </p>

      <div className="flex flex-col gap-y-2">
        <InputField
          autoFocus
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
      <Button type="submit" classes="self-end" disabled={isPending}>
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

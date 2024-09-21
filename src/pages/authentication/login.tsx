import Key from "@asset/svg/key.svg";
import Envelope from "@asset/svg/envelope.svg";
import { useForm } from "react-hook-form";
import { InputField } from "../../components/input-field.tsx";
import { LoginFormData } from "../../types/login.ts";
import { useLogin } from "../../services/login.ts";
import { Button } from "../../components/button.tsx";

const LoginLayout = () => {
  const { register, handleSubmit } = useForm<LoginFormData>({});
  const { mutate, isPending } = useLogin();
  return (
    <div className="mx-auto flex grow flex-col items-center justify-between gap-6 bg-primary text-right text-sm">
      <p className="text-xs font-extralight leading-loose">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خودتون رو وارد کنید:
      </p>
      <form
        className="flex flex-col items-center justify-center gap-6"
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        <InputField
          autoFocus
          placeholder={"نام کاربری یا ایمیل"}
          svg={Envelope}
          {...register("userName")}
        />
        <InputField
          placeholder={"رمز عبور"}
          type="password"
          svg={Key}
          {...register("password")}
        />
        <div className="flex items-center self-start">
          <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
          <label htmlFor="rememberMe" className="inline text-xs">
            من‌را به خاطر بسپار
          </label>
        </div>
        <Button type="submit" classes="self-end" disabled={isPending}>
          ورود
        </Button>
      </form>
    </div>
  );
};

export const Login = () => {
  return <LoginLayout></LoginLayout>;
};
export const LoginMobile = () => {
  return <LoginLayout></LoginLayout>;
};

import Key from "../assets/svg/key.svg";
import Envelope from "../assets/svg/envelope.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../reusable-components/input-field.tsx";
import { LoginFormData } from "../common/types/login.ts";
import { useLogin } from "../api-hooks/login.ts";
import { Button } from "../reusable-components/button.tsx";
import { Alert } from "../reusable-components/alert.tsx";
// import { errorMessages } from "../../common/error-messages";

const LoginLayout = () => {
  const { register, handleSubmit } = useForm<LoginFormData>({});
  const { isError, error, mutate } = useLogin();

  return (
    <div className="bgColor mx-auto flex w-80 flex-col justify-between gap-6 text-right text-sm">
      <p className="text-xs font-extralight leading-loose">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خودتون رو وارد کنید:
      </p>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        {isError && <Alert status="error" message={error.message}></Alert>}
        <InputField
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
        <div className="flex items-center">
          <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
          <label htmlFor="rememberMe" className="inline text-xs">
            من‌را به خاطر بسپار
          </label>
        </div>
        <Button type="submit" classes="self-end">
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

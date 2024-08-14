import Key from "../assets/svg/key.svg";
import Envelope from "../assets/svg/envelope.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../reusable-components/input-field.tsx";
import { loginSchema, LoginFormData } from "../common/types/login.ts";
import { useLogin } from "../api-hooks/login.ts";
import { Button } from "../reusable-components/button.tsx";
import { Alert } from "../reusable-components/alert.tsx";

const LoginLayout = () => {
  const { register, handleSubmit } = useForm<LoginFormData>({
    criteriaMode: "all",
    resolver: zodResolver(loginSchema),
  });
  const { isError, error, mutate } = useLogin();

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className=" bgColor flex flex-col p-2 gap-6 justify-between text-sm text-right w-80 mx-auto">
      <p className="font-extralight text-xs leading-loose">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خودتون رو وارد کنید:
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {isError && <Alert status="error" message={error.message}></Alert>}
        <InputField
          placeholder={"نام کاربری یا ایمیل"}
          svg={Envelope}
          {...register("emailOrUserName")}
        />
        <InputField
          placeholder={"رمز عبور"}
          type="password"
          svg={Key}
          {...register("password")}
        />
        <div className="flex items-center">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe" className="inline text-xs">
            من‌را به خاطر بسپار
          </label>
        </div>
        <Button className="self-end" type="submit" size="medium">
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

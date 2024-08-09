import { Key } from "../assets/svg/key.tsx";
import { Envelope } from "../assets/svg/envelope.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../reusable-components/input-field.tsx";
import { loginSchema, LoginFormData } from "../common/types/login.ts";
import { useLogin } from "../api-hooks/login.tsx";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";

const LoginLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    criteriaMode: "all",
    resolver: zodResolver(loginSchema),
  });
  const { isError, error, mutate } = useLogin();

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className=" flex flex-col p-2 gap-5 justify-between w-96 mx-auto">
      <p className="font-extralight text-xs leading-loose">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خودتون رو وارد کنید:
      </p>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {isError && <Alert severity="error">{error.message}</Alert>}
        <InputField
          placeholder={"نام کاربری یا ایمیل"}
          error={errors.emailOrUsername}
          svg={Envelope}
          {...register("emailOrUsername")}
        />
        <InputField
          placeholder={"رمز عبور"}
          error={errors.password}
          svg={Key}
          {...register("password")}
        />
        <FormControlLabel
          labelPlacement="end"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "15px",
            },
          }}
          control={
            <Checkbox defaultChecked {...register("rememberMe")} size="small" />
          }
          label="من‌را به خاطر بسپار"
        />

        <button type="submit" className="btn">
          ورود
        </button>
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

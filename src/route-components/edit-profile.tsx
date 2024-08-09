import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, CircularProgress } from "@mui/material";
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
import { CancelBtn } from "../reusable-components/cancel -btn.tsx";
import { urls } from "../common/routes.ts";
import { useNavigate } from "react-router-dom";
import { useEditProfile, useGetProfile } from "../api-hooks/edit-profile.ts";
import { useEffect } from "react";
import { ProfileFormValue } from "../common/types/profile.ts";

export const EditProfileLayout = () => {
    //remove export
  const navigate = useNavigate();
  const {data: profile } = useGetProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValue>({
    criteriaMode: "all",
    resolver: zodResolver(signupFormValueSchema),
    defaultValues: profile
  });

  //   const {data, isError, error:get}= useGetProfile();
  //   useEffect(()=>{
  //   },[]);

    const { isError, error, mutate } = useEditProfile();

  const onSubmit: SubmitHandler<ProfileFormValue> = (formData) => {
    // mutate(formData);
  };

  if(!profile) {
    return <CircularProgress />
  }

  return (
    <form
      className="flex flex-col gap-y-8 w-80 m-auto p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* {isError && <Alert severity="error">{error?.message}</Alert>} */}
      <div dir="rtl">
        <p className="text-xs leading-loose text-right font-extralight mb-7">
          ویرایش حساب
        </p>

        <div className="flex flex-col gap-y-5">
          <InputField
            placeholder="نام"
            defaultValue={profile.data?.name}
            error={errors.username}
            svg={PersonIcon}
            {...register("username")}
          />
          <InputField
            type="email"
            placeholder="ایمیل"
            defaultValue={profile.data?.email}
            error={errors.email}
            svg={Envelope}
            {...register("email")}
          />
          <InputField
            placeholder="رمز عبور"
            defaultValue={profile.data?.password}
            type="password"
            error={errors.password}
            svg={Key}
            {...register("password")}
          />
          <InputField
            placeholder="تکرار رمز عبور"
            defaultValue={profile.data?.confirmPassword}
            type="password"
            error={errors.confirmPassword}
            svg={Key}
            {...register("confirmPassword")}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end w-80 h-9 gap-2">
        <CancelBtn onClick={() => navigate(urls.main + urls.myPage)}>
          پشیمون شدم
        </CancelBtn>
        <SubmitBtn className="w-48" size="medium">
          ثبت تغییرات
        </SubmitBtn>
      </div>
    </form>
  );
};

export const EditProfile = () => {
  return <EditProfileLayout />;
};

export const EditProfileMoblie = () => {
  return <EditProfileLayout />;
};

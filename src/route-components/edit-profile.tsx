import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "../reusable-components/input-field";
import PersonIcon from "../assets/svg/profile.svg";
import KeyIcon from "../assets/svg/key.svg";
import EnvelopeIcon from "../assets/svg/envelope.svg";
import { useEditProfile } from "../api-hooks/edit-profile.ts";
import {
  ProfileFormValue,
  editProfileFormValueSchema,
} from "../common/types/profile.ts";
import { Alert } from "../reusable-components/alert";
import cameraIcon from "../assets/svg/camera-icon.svg";
import { Button } from "../reusable-components/button.tsx";
import { UploadImage } from "../reusable-components/upload-image.tsx";
import { Switch } from "../reusable-components/switch.tsx";
import {
  ContainterMobile,
  ContainterWeb,
} from "../reusable-components/container.tsx";
import { TextArea } from "../reusable-components/text-area.tsx";
import { useGetProfile } from "../api-hooks/get-my-profile.ts";
import { useNavigate } from "react-router-dom";

const EditProfileLayout = () => {
  const { data: profile, refetch } = useGetProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<ProfileFormValue>({
    criteriaMode: "all",
    resolver: zodResolver(editProfileFormValueSchema),
  });
  const handleProfileUpdated = () => {
    refetch();
    const closeButton = document.body.querySelector("#close-modal");
    (closeButton as HTMLElement).click();
  };

  const { isError, error, mutate } = useEditProfile(handleProfileUpdated);
  if (isError) {
    //alert//console.log("error edit", error);
  }

  const onSubmit: SubmitHandler<ProfileFormValue> = (formData) => {
    mutate(formData);
  };

  const isSetProfileImage = profile?.profileImage && profile.profileImage != "";
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-start self-center"
    >
      <div className="flex flex-col items-center">
        <p className="my-1 w-fit text-center text-xl font-bold">ویرایش حساب</p>
        <UploadImage
          placeholderImage={
            isSetProfileImage ? profile.profileImage : cameraIcon
          }
          error={errors.profileImage?.message}
          className="block h-20 w-20 rounded-full"
          {...register("profileImage", {
            onChange: () => trigger("profileImage"),
          })}
        />
        <p className="text-center font-medium">عکس پروفایل</p>
        <Alert status="error" message={error?.message} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center">
          <InputField
            fieldsize="xsmall"
            placeholder="نام"
            defaultValue={profile?.firstName}
            error={errors.firstName?.message}
            svg={PersonIcon}
            {...register("firstName")}
          />
          <InputField
            fieldsize="xsmall"
            placeholder="نام خانوادگی"
            defaultValue={profile?.lastName}
            error={errors.lastName?.message}
            svg={PersonIcon}
            {...register("lastName")}
          />
          <InputField
            fieldsize="xsmall"
            type="email"
            placeholder="ایمیل"
            defaultValue={profile?.email}
            error={errors.email?.message}
            svg={EnvelopeIcon}
            {...register("email")}
          />
          <InputField
            fieldsize="xsmall"
            placeholder="رمز عبور"
            type="password"
            error={errors.password?.message}
            svg={KeyIcon}
            {...register("password")}
          />
          <InputField
            fieldsize="xsmall"
            placeholder="تکرار رمز عبور"
            type="password"
            error={errors.confirmPassword?.message}
            svg={KeyIcon}
            {...register("confirmPassword")}
          />
        </div>
        <Switch
          defaultChecked={profile?.isPrivate}
          label="پیچ خصوصی باشه"
          {...register("isPrivate")}
        />

        <label className="flex flex-col gap-4 text-sm">
          بایو
          <TextArea
            rows={2}
            cols={40}
            defaultValue={profile?.bio}
            {...register("bio")}
          />
        </label>

        <div className="flex h-8 flex-row justify-end gap-2">
          <Button
            btnColor="transparent"
            type="button"
            id="close-modal"
            onClick={() => {
              setTimeout(() => {
                navigate(-1);
              }, 450);
            }}
          >
            پشیمون شدم
          </Button>
          <Button classes="w-48" type="submit">
            ثبت تغییرات
          </Button>
        </div>
      </div>
    </form>
  );
};

export const EditProfile = () => {
  return (
    <ContainterWeb>
      <EditProfileLayout />
    </ContainterWeb>
  );
};

export const EditProfileMoblie = () => {
  return (
    <ContainterMobile className="w-fit rounded-t-3xl border-2 border-solid border-gray-300">
      <EditProfileLayout />
    </ContainterMobile>
  );
};

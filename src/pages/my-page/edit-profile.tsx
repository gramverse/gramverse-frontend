import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useEditProfile } from "../../services/edit-profile.ts";
import { useGetProfile } from "../../services/get-my-profile.ts";
import {
  ProfileFormValue,
  editProfileFormValueSchema,
} from "../../types/profile.ts";
import { Button } from "../../components/button.tsx";
import {
  ContainterMobile,
  ContainterWeb,
} from "../../components/container.tsx";
import { InputField } from "../../components/input-field.tsx";
import { Switch } from "../../components/switch.tsx";
import { TextArea } from "../../components/text-area.tsx";
import { UploadImage } from "../../components/upload-image.tsx";
import cameraIcon from "../../assets/svg/camera-icon.svg";
import EnvelopeIcon from "../../assets/svg/envelope.svg";
import KeyIcon from "../../assets/svg/key.svg";
import PersonIcon from "../../assets/svg/profile.svg";

const EditProfileLayout = ({ close }: { close: () => void }) => {
  const { data: profile, refetch, isSuccess } = useGetProfile();
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
    close();
  };

  const { mutate, isPending } = useEditProfile(handleProfileUpdated);

  const onSubmit: SubmitHandler<ProfileFormValue> = (formData) => {
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-start self-center"
    >
      <div className="flex flex-col items-center">
        <p className="my-1 w-fit text-center text-xl font-bold">ویرایش حساب</p>
        <UploadImage
          placeholderImage={
            isSuccess
              ? profile.profileImage != ""
                ? profile.profileImage
                : cameraIcon
              : cameraIcon
          }
          error={errors.profileImage?.message}
          className="block h-20 w-20 rounded-full"
          {...register("profileImage", {
            onChange: () => trigger("profileImage"),
          })}
        />
        <p className="text-center font-medium">عکس پروفایل</p>
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
            maxLength={100}
            defaultValue={profile?.bio}
            {...register("bio")}
          />
        </label>

        <div className="flex h-8 flex-row justify-end gap-2">
          <Button
            btnColor="transparent"
            type="button"
            onClick={() => {
              close();
            }}
          >
            پشیمون شدم
          </Button>
          <Button classes="w-48" type="submit" disabled={isPending}>
            ثبت تغییرات
          </Button>
        </div>
      </div>
    </form>
  );
};

export const EditProfile = ({ close }: { close: () => void }) => {
  return (
    <ContainterWeb>
      <EditProfileLayout close={close} />
    </ContainterWeb>
  );
};

export const EditProfileMoblie = ({ close }: { close: () => void }) => {
  return (
    <ContainterMobile className="w-fit rounded-t-3xl border-2 border-solid border-gray-300">
      <EditProfileLayout close={close} />
    </ContainterMobile>
  );
};

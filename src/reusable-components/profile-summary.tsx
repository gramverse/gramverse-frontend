import { useGetProfile } from "../api-hooks/get-my-profile";
import { RoundPicture } from "./profile-picture";
import profile from "../assets/svg/profile.svg";
import clsx from "clsx";
import { HTMLAttributes } from "react";

interface ProfileSummary extends HTMLAttributes<HTMLDivElement> {
  handleClick: (tab: string) => void;
}
export const ProfileSummary = (props: ProfileSummary) => {
  const { className, handleClick } = props;
  const { data: profileSummary } = useGetProfile();
  return (
    <div
      className={clsx("flex items-center gap-5", className)}
      onClick={() => {
        handleClick("myPage");
      }}
    >
      <RoundPicture
        picture={
          profileSummary?.profileImage ? profileSummary.profileImage : profile
        }
        onClick={() => {
          handleClick("myPage");
        }}
      />
      <span>{profileSummary?.userName || ""}</span>
    </div>
  );
};

import { useGetProfile } from "../api-hooks/get-my-profile";
import { RoundPicture } from "./profile-picture";
import profile from "../assets/svg/profile.svg";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileSummary = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className } = props;
  const { data: profileSummary } = useGetProfile();
  const navigate = useNavigate();
  return (
    <div
      className={clsx("flex items-center gap-5", className)}
      onClick={() => {
        navigate(`profile/${profileSummary?.userName}` ?? "/");
      }}
    >
      <RoundPicture
        picture={
          profileSummary?.profileImage ? profileSummary.profileImage : profile
        }
      />
      <span>{profileSummary?.userName || ""}</span>
    </div>
  );
};

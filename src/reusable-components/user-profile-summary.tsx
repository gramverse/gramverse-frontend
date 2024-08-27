import { RoundPicture } from "./profile-picture";
import profile from "../assets/svg/profile.svg";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../api-hooks/user-page";

interface UserProfile extends HTMLAttributes<HTMLDivElement> {
  userName: string;
}
export const UserProfileSummary = (props: UserProfile) => {
  const { className, userName } = props;
  const { data: profileSummary, isSuccess } = useGetUserProfile(userName);
  const navigate = useNavigate();
  return (
    <div
      className={clsx("flex items-center gap-5", className)}
      onClick={() => {
        isSuccess && navigate(`/user/${profileSummary.userName}`);
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

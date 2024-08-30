import { RoundPicture } from "./profile-picture";
import profile from "../assets/svg/profile.svg";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../api-hooks/user-page";

interface UserProfile extends HTMLAttributes<HTMLDivElement> {
  userName: string;
  profilePicture?: string;
  followerCount?: number;
}
export const UserProfileSummary = (props: UserProfile) => {
  const { className, userName, profilePicture, followerCount } = props;
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
        classes="bg-red-200 p-1"
        picture={profilePicture ?? profileSummary?.profileImage ?? profile}
        size={followerCount ? "large" : "medium"}
      />
      <div className="flex flex-col">
        <span>{userName}</span>
        <small className="text-xs font-thin text-gray-600">
          {followerCount ?? ""} {"دنبال کننده"}
        </small>
      </div>
    </div>
  );
};

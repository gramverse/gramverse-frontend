import { RoundPicture } from "./round-picture";
import profile from "../assets/svg/profile.svg";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../services/user-page";

interface UserProfile extends HTMLAttributes<HTMLDivElement> {
  userName: string;
  profilePicture?: string;
  followerCount?: number;
}
export const UserProfileSummary = (props: UserProfile) => {
  const { className, userName, profilePicture, followerCount, onClick } = props;
  const { userProfile: profileSummary, isSuccess } =
    useGetUserProfile(userName);
  const navigate = useNavigate();
  return (
    <div
      className={clsx("flex items-center gap-5", className)}
      onClick={(e) => {
        onClick
          ? onClick(e)
          : isSuccess && navigate(`/${profileSummary?.userName}`);
      }}
    >
      <RoundPicture
        picture={
          profilePicture && profilePicture !== ""
            ? profilePicture
            : profileSummary?.profileImage && profileSummary.profileImage !== ""
              ? profileSummary.profileImage
              : profile
        }
        size={followerCount !== undefined ? "large" : "medium"}
      />
      <div className="flex flex-col gap-2">
        <span className="text-base font-bold">{userName}</span>
        {followerCount !== undefined && (
          <small className="text-xs font-thin text-gray-600">
            {followerCount} {"دنبال کننده"}
          </small>
        )}
      </div>
    </div>
  );
};

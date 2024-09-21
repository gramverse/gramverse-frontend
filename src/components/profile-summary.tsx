import { RoundPicture } from "./round-picture";
import profile from "@asset/svg/profile.svg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../services/my-page";

type ProfileSummaryProops = {
  className?: string;
  hasUserName?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
};
export const ProfileSummary = (props: ProfileSummaryProops) => {
  const { className, hasUserName, size = "medium" } = props;
  const { data: profileSummary, isSuccess } = useGetProfile();
  const navigate = useNavigate();
  return (
    <div
      className={clsx("flex items-center gap-5", className)}
      onClick={() => {
        isSuccess && navigate(`/${profileSummary.userName}`);
      }}
    >
      <RoundPicture
        size={size}
        picture={
          isSuccess
            ? profileSummary.profileImage !== ""
              ? profileSummary.profileImage
              : profile
            : profile
        }
      />
      {hasUserName && <span>{isSuccess ? profileSummary.userName : ""}</span>}
    </div>
  );
};

import { useGetProfileSummary } from "../api-hooks/main";
import { RoundPicture } from "./profile-picture"
import profile from "../assets/svg/profile.svg";
import clsx from "clsx";
import { HTMLAttributes } from "react";

interface ProfileSummary extends HTMLAttributes<HTMLDivElement>{
  handleClick: (tab: string) => void
  userName:string
}
export const ProfileSummary = (props: ProfileSummary) => {
  const {className,userName,handleClick}=props
    const { data: profileSummary } = useGetProfileSummary();

    return (
        <div className={clsx("flex gap-5 items-center",className)}>
        <RoundPicture
          picture={
            profileSummary?.profileImage
              ? profileSummary.profileImage
              : profile
          }
          onClick={() => handleClick("myPage")}
        />
        <span>
          {profileSummary?.userName ? profileSummary?.userName:userName}
        </span>
      </div>
    )
}
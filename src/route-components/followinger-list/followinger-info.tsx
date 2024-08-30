import { FollowingerInfo } from "../../common/types/followinger-info";
import PersonIcon from "../../assets/svg/profile.svg";

type FollowerInfoProps = FollowingerInfo;

export const  FollowingersInfo = ({
  userName,
  followerCount,
  profileImage,
}: FollowerInfoProps) => {
  const isSetProfileImage = profileImage && profileImage != "";
  return (
    <div className="flex h-20 w-80 flex-row items-center border border-x-0 border-t-0 border-solid border-form-border">
      <img
        className="h-14 w-14 object-cover"
        src={isSetProfileImage ? profileImage : PersonIcon}
      />
      <div className="flex w-48 flex-col">
        <p>{userName}</p>
        <p>{`${followerCount} دنبال کننده`}</p>
      </div>
      <div className="flex h-20 flex-col items-end justify-center gap-[3px]">
        <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
        <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
        <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
      </div>
    </div>
  );
};

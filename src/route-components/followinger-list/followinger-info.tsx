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
    <div className="flex h-20 w-[19.5rem] flex-row items-center border border-x-0 border-t-0 border-solid border-form-border">
      <label className="block h-14 w-14 overflow-hidden rounded-full ml-4">
          <img
            className="h-full w-full object-cover"
            src={isSetProfileImage ? profileImage : PersonIcon}
          />
        </label>
      <div className="flex h-12 w-48 flex-col">
        <div className="text-sm font-bold">{userName}</div>
        <div className="text-xs font-normal">{`${followerCount} دنبال کننده`}</div>
      </div>
      <div className="flex w-11 h-20 flex-col items-end justify-center gap-[3px] pl-4">
        <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
        <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
        <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
      </div>
    </div>
  );
};

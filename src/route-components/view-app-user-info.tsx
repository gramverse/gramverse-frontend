import { Profile } from "../common/types/profle-data";
import { Button } from "../reusable-components/button";
import PersonIcon from "../assets/svg/profile.svg";
import { FollowingProfile } from "../common/types/following-profile";

type AppUserInfoProps = {
  userInfo: Profile | FollowingProfile;
  followMode?: boolean;
  isFollowed?: boolean;
  onFollowMethod?: (userName: string) => void;
};

export const ViewAppUserInfo = ({
  userInfo,
  followMode = false,
  isFollowed = false,
  onFollowMethod,
}: AppUserInfoProps) => {
  return (
    <>
      <div className="w-[133px]">
        <label className="block h-[133px] w-[133px] overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover"
            src={userInfo.profileImage ?? PersonIcon}
          />
        </label>
      </div>
      <div className="flex h-40 w-[377px] flex-col justify-start gap-4">
        {!followMode && (
          <div className="size-3.5 w-20 font-normal text-[#C19008]">{`${userInfo.userName}@`}</div>
        )}
        {followMode && (
          <>
            <div className="ml-4 size-3.5 w-20 font-normal text-[#C19008]">{`${userInfo.userName}@`}</div>

            <div className="flex w-96 flex-row gap-4">
              <div className="size-5 w-32 font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
              <Button
                type="submit"
                size="medium"
                onClick={() => {
                  onFollowMethod && onFollowMethod(userInfo.userName);
                }}
                btnColor={isFollowed ? "outline" : "secondary"}
              >
                {isFollowed ? "دنبال نکردن" : "+ دنبال کردن"}
              </Button>
            </div>
          </>
        )}
        <div className="size-3.5 w-96 font-normal leading-6"></div>
        <div className="size-3.5 w-96 font-normal leading-6">
          <span className="ml-3 w-24 text-amber-500">{`‍${userInfo.followerCount} دنبال کننده  ‍`}</span>
          <span>|</span>
          <span className="mx-3 w-24 text-amber-500">{`‍  ${userInfo.followingCount} دنبال شونده`}</span>
          <span>|</span>
          <span className="mr-3 w-24">{`‍ ${userInfo.postCount} پست ‍`}</span>
        </div>
        <div className="size-3.5 h-9 w-[377px] font-normal">{userInfo.bio}</div>
      </div>
    </>
  );
};

import { Profile } from "../common/types/profile-data";
import { Button } from "../reusable-components/button";
import PersonIcon from "../assets/svg/profile.svg";
import { FollowingProfile } from "../common/types/following-profile";
import { FollowMutationArgs } from "../api-hooks/user-page";

type AppUserInfoProps = {
  userInfo: Profile | FollowingProfile;
  followMode?: boolean;
  isFollowed?: boolean;
  onFollowMethod?: (args: FollowMutationArgs) => void;
};

export const ViewAppUserInfo = ({
  userInfo,
  followMode = false,
  isFollowed = false,
  onFollowMethod,
}: AppUserInfoProps) => {
  const isSetProfileImage =
    userInfo.profileImage && userInfo.profileImage != "";
  return (
    <div className="flex items-center gap-2">
      <img
        className="h-40 w-40 object-cover"
        src={isSetProfileImage ? userInfo.profileImage : PersonIcon}
      />
      <div className="mb-5 flex h-fit w-[377px] flex-col justify-start gap-4">
        <div className="w-full text-sm font-normal text-[#C19008]">{`${userInfo.userName}@`}</div>
        {!followMode && (
          <div className="size-5 w-full font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
        )}
        {followMode && (
          <div className="flex w-96 flex-row gap-4">
            <div className="size-5 w-32 font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
            <Button
              type="submit"
              size="medium"
              onClick={() => {
                onFollowMethod?.({
                  userName: userInfo.userName,
                  follow: !isFollowed,
                });
              }}
              btnColor={isFollowed ? "outline" : "secondary"}
            >
              {isFollowed ? "دنبال نکردن" : "+ دنبال کردن"}
            </Button>
          </div>
        )}
        <div className="w-96 text-sm font-normal leading-6"></div>
        <div className="w-96 text-sm font-normal leading-6">
          <span className="ml-3 w-24 text-amber-500">{`‍${userInfo.followerCount} دنبال کننده  ‍`}</span>
          <span>|</span>
          <span className="mx-3 w-24 text-amber-500">{`‍  ${userInfo.followingCount} دنبال شونده`}</span>
          <span>|</span>
          <span className="mr-3 w-24">{`‍ ${userInfo.postCount} پست ‍`}</span>
        </div>
        <div className="h-fit w-full text-sm font-normal text-[#A5A5A5]">
          {userInfo.bio}
        </div>
      </div>
    </div>
  );
};

export const ViewAppUserInfoMobile = ({
  userInfo,
  followMode = false,
  isFollowed = false,
  onFollowMethod,
}: AppUserInfoProps) => {
  const isSetProfileImage =
    userInfo.profileImage && userInfo.profileImage != "";
  return (
    <>
      <div className="flex w-[311px] flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row gap-4">
          <label className="block h-14 w-14 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover"
              src={isSetProfileImage ? userInfo.profileImage : PersonIcon}
            />
          </label>
          <div className="flex flex-col gap-2">
            <div className="ml-4 w-full text-sm font-normal text-[#C19008]">{`${userInfo.userName}@`}</div>
            {!followMode && (
              <div className="w-full text-xl font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
            )}
            {followMode && (
              <div className="flex w-96 flex-row gap-4">
                <div className="text-xl font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
                <Button
                  type="submit"
                  size="small"
                  classes="w-36 text-xs"
                  onClick={() => {
                    onFollowMethod?.({
                      userName: userInfo.userName,
                      follow: !isFollowed,
                    });
                  }}
                  btnColor={isFollowed ? "outline" : "secondary"}
                >
                  {isFollowed ? "دنبال نکردن" : "+ دنبال کردن"}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full text-sm font-normal leading-6">
            <span className="ml-3 w-24 text-amber-500">{`‍${userInfo.followerCount} دنبال کننده  ‍`}</span>
            <span>|</span>
            <span className="mx-3 w-24 text-amber-500">{`‍  ${userInfo.followingCount} دنبال شونده`}</span>
            <span>|</span>
            <span className="mr-3 w-24">{`‍ ${userInfo.postCount} پست ‍`}</span>
          </div>
          <div className="text-sm font-normal text-[#A5A5A5]">
            {userInfo.bio}
          </div>
        </div>
      </div>
    </>
  );
};

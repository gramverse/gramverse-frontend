import { BtnStyles, Button } from "../../components/button";
import PersonIcon from "../../assets/svg/profile.svg";
import { UserProfile } from "../../types/user-profile";
import clsx from "clsx";
import { RoundPicture } from "../../components/round-picture";
import { useNavigate } from "react-router-dom";

type AppUserInfoProps = {
  accountInfo: UserProfile;
  onFollowMethod?: () => void;
  onShowFollowerList?: () => void;
  onShowFollowingList?: () => void;
  isUserDataVisible: boolean;
  followBtnText?: string;
  followBtnColor?: BtnStyles;
  openModal: () => void;
};
const calculateCount = (count: number) => {
  if (count >= 1000) {
    if (Math.floor((count % 1000) / 100) >= 1)
      return `${Math.floor(count / 1000)}.${Math.floor((count % 1000) / 100)}k`;
    else return ` ${Math.floor(count / 1000)}k`;
  } else {
    return `${count}`;
  }
};
export const UserAccountInfo = ({
  accountInfo: accountInfo,
  onFollowMethod,
  onShowFollowerList,
  onShowFollowingList,
  isUserDataVisible,
  followBtnText,
  followBtnColor,
  openModal,
}: AppUserInfoProps) => {
  const existFollowing = accountInfo.followingCount > 0;
  const existFollower = accountInfo.followerCount > 0;
  return (
    <div>
      <div className="flex gap-2">
        <RoundPicture
          size="xlarge"
          picture={
            accountInfo.profileImage && accountInfo.profileImage != ""
              ? accountInfo.profileImage
              : PersonIcon
          }
        />
        <div className="mb-5 flex h-fit w-[23.5rem] flex-col justify-start gap-4">
          <div className="w-full text-sm font-normal text-[#C19008]">{`${accountInfo.userName}@`}</div>

          <div className="flex w-96 flex-row gap-4">
            <div className="size-5 w-32 font-bold">{`${accountInfo.firstName} ${accountInfo.lastName}`}</div>
            <Button
              size="medium"
              onClick={accountInfo.isBlocked ? openModal : onFollowMethod}
              btnColor={followBtnColor}
              disabled={accountInfo.hasBlockedUs}
            >
              {followBtnText}
            </Button>
          </div>

          <div className="w-96 text-sm font-normal leading-6"></div>
          <div className="w-96 text-sm font-normal leading-6">
            <span
              className={clsx(
                "ml-3 w-24 text-amber-500",
                existFollower && "cursor-pointer",
              )}
              {...(existFollower &&
                isUserDataVisible && {
                  onClick: onShowFollowerList,
                })}
            >{`‍${calculateCount(accountInfo.followerCount)} دنبال کننده  ‍`}</span>
            <span>|</span>
            <span
              className={clsx(
                "mx-3 w-24 text-amber-500",
                existFollowing && "cursor-pointer",
              )}
              {...(existFollowing &&
                isUserDataVisible && {
                  onClick: onShowFollowingList,
                })}
            >{`‍  ${calculateCount(accountInfo.followingCount)} دنبال شونده`}</span>
            <span>|</span>
            <span className="mr-3 w-24">{`‍ ${calculateCount(accountInfo.postCount)} پست ‍`}</span>
          </div>
          <div className="h-fit w-full text-sm font-normal text-[#A5A5A5]">
            {accountInfo.bio}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserAccountInfoMobile = ({
  accountInfo: accountInfo,
  isUserDataVisible,
}: AppUserInfoProps) => {
  const existFollowing = accountInfo.followingCount > 0;
  const existFollower = accountInfo.followerCount > 0;
  const navigate = useNavigate();
  return (
    <div className="max-h-1/3 flex w-72 flex-col items-start justify-center gap-4">
      <div className="flex flex-row gap-4">
        <RoundPicture
          size="medium"
          picture={
            accountInfo.profileImage && accountInfo.profileImage != ""
              ? accountInfo.profileImage
              : PersonIcon
          }
        />
        <div className="flex flex-col gap-2">
          <div className="ml-4 text-sm font-normal text-[#C19008]">{`${accountInfo.userName}@`}</div>
          <div className="text-xl font-bold">{`${accountInfo.firstName} ${accountInfo.lastName}`}</div>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="flex w-fit gap-2 text-sm font-normal">
          <span
            className={clsx(
              "text-amber-500",
              existFollower && "cursor-pointer",
            )}
            {...(existFollower &&
              isUserDataVisible && {
                onClick: () => {
                  navigate(`/${accountInfo.userName}/followers`);
                },
              })}
          >{`‍${accountInfo.followerCount} دنبال کننده  ‍`}</span>
          <span>|</span>
          <span
            className={clsx(
              "text-amber-500",
              existFollowing && "cursor-pointer",
            )}
            {...(existFollowing &&
              isUserDataVisible && {
                onClick: () => {
                  navigate(`/${accountInfo.userName}/followings`);
                },
              })}
          >{`‍  ${accountInfo.followingCount} دنبال شونده`}</span>
          <span>|</span>
          <span className="text-nowrap">{`‍ ${accountInfo.postCount} پست`}</span>
        </div>
        <div className="text-sm font-normal text-[#A5A5A5]">
          {accountInfo.bio}
        </div>
      </div>
    </div>
  );
};

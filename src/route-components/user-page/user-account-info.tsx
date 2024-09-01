import { Button } from "../../reusable-components/button";
import PersonIcon from "../../assets/svg/profile.svg";
import { FollowMutationArgs } from "../../api-hooks/user-page";
import { requestStatus, UserProfile } from "../../common/types/user-profile";
import clsx from "clsx";
import { RoundPicture } from "../../reusable-components/profile-picture";
import { useNavigate } from "react-router-dom";

type AppUserInfoProps = {
  accountInfo: UserProfile;
  onFollowMethod?: (args: FollowMutationArgs) => void;
  onShowFollowerList?: () => void;
  onShowFollowingList?: () => void;
};

export const UserAccountInfo = ({
  accountInfo: accountInfo,
  onFollowMethod,
  onShowFollowerList,
  onShowFollowingList,
}: AppUserInfoProps) => {
  const followBtnText = accountInfo.hasBlockedUs
    ? "+ دنبال کردن"
    : accountInfo.followRequestState == requestStatus.pending
      ? "لغو درخواست"
      : accountInfo.followRequestState == requestStatus.accepted
        ? "دنبال نکردن"
        : "+ دنبال کردن";

  const followBtnColor = accountInfo.hasBlockedUs
    ? "disabled"
    : accountInfo.followRequestState == requestStatus.pending ||
        accountInfo.followRequestState == requestStatus.accepted
      ? "outline"
      : "secondary";
  const handleFollowBtn = () => {
    onFollowMethod?.({
      userName: accountInfo.userName,
      follow:
        accountInfo.followRequestState == requestStatus.none ||
        accountInfo.followRequestState == requestStatus.unfollowed ||
        !(accountInfo.followRequestState == requestStatus.pending),
    });
  };

  const existFollowing = accountInfo.followingCount > 0;
  const existFollower = accountInfo.followerCount > 0;
  return (
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
            onClick={handleFollowBtn}
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
            {...(existFollower && {
              onClick: onShowFollowerList,
            })}
          >{`‍${accountInfo.followerCount} دنبال کننده  ‍`}</span>
          <span>|</span>
          <span
            className={clsx(
              "mx-3 w-24 text-amber-500",
              existFollowing && "cursor-pointer",
            )}
            {...(existFollowing && {
              onClick: onShowFollowingList,
            })}
          >{`‍  ${accountInfo.followingCount} دنبال شونده`}</span>
          <span>|</span>
          <span className="mr-3 w-24">{`‍ ${accountInfo.postCount} پست ‍`}</span>
        </div>
        <div className="h-fit w-full text-sm font-normal text-[#A5A5A5]">
          {accountInfo.bio}
        </div>
      </div>
    </div>
  );
};

export const UserAccountInfoMobile = ({
  accountInfo: accountInfo,
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
            {...(existFollower && {
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
            {...(existFollowing && {
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

import { Button } from "../../reusable-components/button";
import PersonIcon from "../../assets/svg/profile.svg";
import { FollowMutationArgs } from "../../api-hooks/user-page";
import { requestStatus, UserProfile } from "../../common/types/user-profile";

type AppUserInfoProps = {
  accountInfo: UserProfile;
  onFollowMethod?: (args: FollowMutationArgs) => void;
  onCancelRequestMethod?: (userName: string) => void;
  onShowFollowerList: () => void;
  onShowFollowingList: () => void;
};

//check mobile functinality
export const UserAccountInfo = ({
  accountInfo: accountInfo,
  onFollowMethod,
  onCancelRequestMethod,
  onShowFollowerList,
  onShowFollowingList,
}: AppUserInfoProps) => {
  const isSetProfileImage =
    accountInfo.profileImage && accountInfo.profileImage != "";

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
    accountInfo.followRequestState == requestStatus.pending
      ? onCancelRequestMethod?.(accountInfo.userName)
      : onFollowMethod?.({
          userName: accountInfo.userName,
          follow:
            accountInfo.followRequestState == requestStatus.none ||
            accountInfo.followRequestState == requestStatus.unfollowed, //check kon tu halate acepted dorost kar mikone
          // !accountInfo.isFollowed,
        });
  };

  return (
    <>
      <div className="w-[133px]">
        <label className="block h-[133px] w-[133px] overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover"
            src={isSetProfileImage ? accountInfo.profileImage : PersonIcon}
          />
        </label>
      </div>
      <div className="mb-5 flex h-fit w-[377px] flex-col justify-start gap-4">
        <div className="w-full text-sm font-normal text-[#C19008]">{`${accountInfo.userName}@`}</div>

        <div className="flex w-96 flex-row gap-4">
          <div className="size-5 w-32 font-bold">{`${accountInfo.firstName} ${accountInfo.lastName}`}</div>
          <Button
            //type="submit"
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
            className="ml-3 w-24 text-amber-500"
            onClick={() => {
              onShowFollowerList();
            }}
          >{`‍${accountInfo.followerCount} دنبال کننده  ‍`}</span>
          <span>|</span>
          <span
            className="mx-3 w-24 text-amber-500"
            onClick={() => {
              onShowFollowingList();
            }}
          >{`‍  ${accountInfo.followingCount} دنبال شونده`}</span>
          <span>|</span>
          <span className="mr-3 w-24">{`‍ ${accountInfo.postCount} پست ‍`}</span>
        </div>
        <div className="h-fit w-full text-sm font-normal text-[#A5A5A5]">
          {accountInfo.bio}
        </div>
      </div>
    </>
  );
};

export const ViewAppUserInfoMobile = ({
  accountInfo: accountInfo,
  onFollowMethod,
  onCancelRequestMethod,
}: AppUserInfoProps) => {
  const isSetProfileImage =
    accountInfo.profileImage && accountInfo.profileImage != "";

  const followBtnText =
    accountInfo.followRequestState == requestStatus.pending
      ? "لغو درخواست"
      : accountInfo.followRequestState == requestStatus.accepted
        ? "دنبال نکردن"
        : "+ دنبال کردن";

  const followBtnColor =
    accountInfo.followRequestState == requestStatus.pending ||
    accountInfo.followRequestState == requestStatus.accepted
      ? "outline"
      : "secondary";
  const handleFollowBtn = () => {
    accountInfo.followRequestState == requestStatus.pending
      ? onCancelRequestMethod?.(accountInfo.userName)
      : onFollowMethod?.({
          userName: accountInfo.userName,
          follow: accountInfo.followRequestState == requestStatus.none, //check kon tu halate acepted dorost kar mikone
          // !accountInfo.isFollowed,
        });
  };

  return (
    <>
      <div className="flex w-[311px] flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row gap-4">
          <label className="block h-14 w-14 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover"
              src={isSetProfileImage ? accountInfo.profileImage : PersonIcon}
            />
          </label>
          <div className="flex flex-col gap-2">
            <div className="ml-4 w-full text-sm font-normal text-[#C19008]">{`${accountInfo.userName}@`}</div>

            <div className="flex w-96 flex-row gap-4">
              <div className="text-xl font-bold">{`${accountInfo.firstName} ${accountInfo.lastName}`}</div>
              <Button
                type="submit"
                size="small"
                classes="w-36 text-xs"
                onClick={handleFollowBtn}
                btnColor={followBtnColor}
              >
                {followBtnText}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full text-sm font-normal leading-6">
            <span className="ml-3 w-24 text-amber-500">{`‍${accountInfo.followerCount} دنبال کننده  ‍`}</span>
            <span>|</span>
            <span className="mx-3 w-24 text-amber-500">{`‍  ${accountInfo.followingCount} دنبال شونده`}</span>
            <span>|</span>
            <span className="mr-3 w-24">{`‍ ${accountInfo.postCount} پست ‍`}</span>
          </div>
          <div className="text-sm font-normal text-[#A5A5A5]">
            {accountInfo.bio}
          </div>
        </div>
      </div>
    </>
  );
};

import { Profile } from "../../common/types/profile-data";
import PersonIcon from "../../assets/svg/profile.svg";
import clsx from "clsx";

type AccountInfoInfoProps = {
  accountInfo: Profile;
  onShowFollowerList: () => void;
  onShowFollowingList: () => void;
};

export const AccountInfo = ({
  accountInfo,
  onShowFollowerList,
  onShowFollowingList,
}: AccountInfoInfoProps) => {
  const isSetProfileImage =
    accountInfo.profileImage && accountInfo.profileImage != "";
  const existFollowing = accountInfo.followingCount > 0;
  const existFollower = accountInfo.followerCount > 0;

  return (
    <div className="flex items-center gap-2">
      <img
        className="h-40 w-40 rounded-full border-none object-cover"
        src={isSetProfileImage ? accountInfo.profileImage : PersonIcon}
      />
      <div className="mb-5 flex h-fit w-[23.5rem] flex-col justify-start gap-4">
        <div className="w-full text-sm font-normal text-[#C19008]">{`${accountInfo.userName}@`}</div>
        <div className="size-5 w-full font-bold">{`${accountInfo.firstName} ${accountInfo.lastName}`}</div>
        <div className="w-96 text-sm font-normal leading-6"></div>
        <div className="w-96 text-sm font-normal leading-6">
          <span
            className={clsx(
              "ml-3 w-24 text-amber-500",
              existFollower && "cursor-pointer",
            )}
            {...(existFollower && { onClick: onShowFollowerList })}
          >
            {`‍${accountInfo.followerCount} دنبال کننده  ‍`}{" "}
          </span>
          <span>|</span>
          <span
            className={clsx(
              "mx-3 w-24 text-amber-500",
              existFollowing && "cursor-pointer",
            )}
            {...(existFollowing && { onClick: onShowFollowingList })}
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

type AccountInfoMobileProps = {
  accountInfo: Profile;
};

export const AccountInfoMobile = ({ accountInfo }: AccountInfoMobileProps) => {
  const isSetProfileImage =
    accountInfo.profileImage && accountInfo.profileImage != "";

  return (
    <>
      <div className="flex w-[19.4rem] flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row gap-4">
          <label className="block h-14 w-14 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover"
              src={isSetProfileImage ? accountInfo.profileImage : PersonIcon}
            />
          </label>
          <div className="flex flex-col gap-2">
            <div className="ml-4 w-full text-sm font-normal text-[#C19008]">{`${accountInfo.userName}@`}</div>

            <div className="w-full text-xl font-bold">{`${accountInfo.firstName} ${accountInfo.lastName}`}</div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full text-sm font-normal leading-6">
            <span className="ml-3 w-24 text-amber-500">{`‍${accountInfo.followerCount} دنبال کننده  ‍`}</span>
            <span>|</span>
            <span>{`‍  ${accountInfo.followingCount} دنبال شونده`}</span>
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

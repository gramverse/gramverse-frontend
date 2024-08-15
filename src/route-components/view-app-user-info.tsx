import { appUserInfo } from "../common/types/appUserInfo";
import { Button } from "../reusable-components/button";

type AppUserInfoProps = {
  userInfo: appUserInfo;
  followMode: boolean;
};

export const ViewAppUserInfo = ({ userInfo, followMode }: AppUserInfoProps) => {
  return (
    <div className="flex h-40 w-[377px] flex-col justify-start gap-4">
      {!followMode && (
        <div className="size-3.5 w-20 font-normal">{userInfo.userName}</div>
      )}
      {followMode && (
        <div className="flex w-64 flex-row gap-4">
          <div className="size-3.5 w-20 font-normal">{userInfo.userName}</div>
          <Button classes="w-52" type="submit" btnColor="outline">
            دنبال کردن
          </Button>
          {/* add + in follow btn */}
        </div>
      )}
      <div className="size-5 w-32 font-bold">{userInfo.fullName}</div>
      <div className="size-3.5 w-80 font-normal leading-6">
        <span className="ml-3 text-amber-500">{`‍${userInfo.followerCount} دنبال کننده  ‍`}</span>
        <span>|</span>
        <span className="mx-3 text-amber-500">{`‍  ${userInfo.followingCount} دنبال شونده`}</span>
        <span>|</span>
        <span className="mr-3">{`‍ ${userInfo.postCount} پست ‍`}</span>
      </div>
      <div className="size-3.5 h-9 w-[377px] font-normal">{userInfo.bio}</div>
    </div>
  );
};

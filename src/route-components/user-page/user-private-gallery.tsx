import { FollowMutationArgs } from "../../api-hooks/user-page";
import { requestStatus, UserProfile } from "../../common/types/user-profile";
import { Button } from "../../reusable-components/button";

type NotAllowedViewGalleryProps = {
  accountInfo: UserProfile;
  onFollowMethod: (args: FollowMutationArgs) => void;
};
export const PrivateGallery = ({
  onFollowMethod,
  accountInfo,
}: NotAllowedViewGalleryProps) => {
  const followBtnText =
    accountInfo.followRequestState == requestStatus.pending
      ? "لغو درخواست"
      : accountInfo.followRequestState == requestStatus.none ||
          accountInfo.followRequestState == requestStatus.declined
        ? "+ دنبال کردن"
        : "";
  const followBtnColor =
    accountInfo.followRequestState == requestStatus.pending
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

  return (
    <div className="mt-3 flex h-full w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        {`برای دیدن صفحه ${accountInfo.userName} باید دنبالش کنی.`}
      </div>
      <Button size="medium" onClick={handleFollowBtn} btnColor={followBtnColor}>
        {followBtnText}
      </Button>
    </div>
  );
};

export const PrivateGalleryMobile = ({
  onFollowMethod,
  accountInfo,
}: NotAllowedViewGalleryProps) => {
  const followBtnText =
    accountInfo.followRequestState == requestStatus.pending
      ? "لغو درخواست"
      : accountInfo.followRequestState == requestStatus.none ||
          accountInfo.followRequestState == requestStatus.declined
        ? "+ دنبال کردن"
        : "";
  const followBtnColor =
    accountInfo.followRequestState == requestStatus.pending
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

  return (
    <div className="flex h-[347px] w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="h-24 w-[311px] text-center text-xl font-bold leading-8">
        {`برای دیدن صفحه ${accountInfo.userName} باید دنبالش کنی.`}
      </div>
      <div className="flex w-80">
        <Button
          size="medium"
          onClick={handleFollowBtn}
          btnColor={followBtnColor}
        >
          {followBtnText}
        </Button>
      </div>
    </div>
  );
};

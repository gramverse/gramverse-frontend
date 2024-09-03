import { RequestStatus, UserProfile } from "../../common/types/user-profile";
import { BtnStyles, Button } from "../../reusable-components/button";

type NotAllowedViewGalleryProps = {
  accountInfo: UserProfile;
  onFollowMethod: () => void;
  followBtnText: string;
  followBtnColor: BtnStyles;
};
export const PrivateGallery = ({
  onFollowMethod,
  accountInfo,
  followBtnText,
  followBtnColor,
}: NotAllowedViewGalleryProps) => {
  // const followBtnText =
  //   accountInfo.followRequestState == RequestStatus.pending
  //     ? "لغو درخواست"
  //     : accountInfo.followRequestState == RequestStatus.none ||
  //         accountInfo.followRequestState == RequestStatus.declined
  //       ? "+ دنبال کردن"
  //       : "";
  // const followBtnColor =
  //   accountInfo.followRequestState == RequestStatus.pending
  //     ? "outline"
  //     : "secondary";

  return (
    <div className="mt-3 flex h-full w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        {`برای دیدن صفحه ${accountInfo.userName} باید دنبالش کنی.`}
      </div>
      <Button size="medium" onClick={onFollowMethod} btnColor={followBtnColor}>
        {followBtnText}
      </Button>
    </div>
  );
};

export const PrivateGalleryMobile = ({
  onFollowMethod,
  accountInfo,
  followBtnText,
  followBtnColor,
}: NotAllowedViewGalleryProps) => {
  // const followBtnText =
  //   accountInfo.followRequestState == RequestStatus.pending
  //     ? "لغو درخواست"
  //     : accountInfo.followRequestState == RequestStatus.none ||
  //         accountInfo.followRequestState == RequestStatus.declined
  //       ? "+ دنبال کردن"
  //       : "";
  // const followBtnColor =
  //   accountInfo.followRequestState == RequestStatus.pending
  //     ? "outline"
  //     : "secondary";

  return (
    <div className="flex h-[347px] w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="h-24 w-[311px] text-center text-xl font-bold leading-8">
        {`برای دیدن صفحه ${accountInfo.userName} باید دنبالش کنی.`}
      </div>
      <div className="flex w-80">
        <Button
          size="medium"
          onClick={onFollowMethod}
          btnColor={followBtnColor}
        >
          {followBtnText}
        </Button>
      </div>
    </div>
  );
};

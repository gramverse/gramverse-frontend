type UserEBlockedGalleryProps = {
  userName: string;
};
export const UserBlockedGallery = ({ userName }: UserEBlockedGalleryProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
      {` نمی‌تونی  ${userName} رو دنبال کنی چون اون نمی‌خواد دوست تو باشه!`}
      </div>
    </div>
  );
};

export const UserBlockedGalleryMobile = ({
  userName,
}: UserEBlockedGalleryProps) => {
  return (
    <div className="flex h-[347px] w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="h-24 w-[311px] text-center text-xl font-bold leading-8">
        {` نمی‌تونی ${userName} رو دنبال کنی چون اون نمی‌خواد دوست تو باشه!`}
      </div>
    </div>
  );
};

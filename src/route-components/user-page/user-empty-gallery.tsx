type UserEmptyGalleryProps = {
  userName: string;
};
export const UserEmptyGallery = ({ userName }: UserEmptyGalleryProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        {` ${userName} هنوز هیچ پستی توی صفحه‌اش نذاشته! خبری نیست برگرد خونه خودت`}
      </div>
    </div>
  );
};

export const UserEmptyGalleryMobile = ({ userName }: UserEmptyGalleryProps) => {
  return (
    <div className="flex h-[347px] w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="h-24 w-[311px] text-center text-xl font-bold leading-8">
      {` ${userName} هنوز هیچ پستی توی صفحه‌اش نذاشته! خبری نیست برگرد خونه خودت`}
      </div>
    </div>
  );
};

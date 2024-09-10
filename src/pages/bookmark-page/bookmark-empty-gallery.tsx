export const BookmarkEmptyGallery = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-[4.43rem] w-[23.1rem] flex-col items-center justify-center gap-8 p-16 text-center font-bold">
        <div className="text-4xl leading-10">هنوز پستی ذخیره نکردی!</div>
        <div className="text-xl">
          اینجا تمام پست‌هایی که ذخیره کردی رو می‌تونی ببینی.
        </div>
      </div>
    </div>
  );
};

export const BookmarkEmptyGalleryMobile = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-[8.25rem] w-[19.43rem] flex-col items-center gap-8 p-16 text-center font-bold">
        <div className="text-4xl leading-10">هنوز پستی ذخیره نکردی!</div>
        <div className="text-xl">
          اینجا تمام پست‌هایی که ذخیره کردی رو می‌تونی ببینی.
        </div>
      </div>
    </div>
  );
};

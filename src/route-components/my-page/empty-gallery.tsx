import { Button } from "../../reusable-components/button";

export const EmptyGallery = () => {
  return (
    <div
      id="post-container"
      className="flex w-[952px] flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border px-16 py-12"
    >
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
      </div>
      <div className="flex w-80">
        <Button classes="w-48 m-auto" type="submit">
          ایجاد پست جدید
        </Button>
      </div>
    </div>
  );
};

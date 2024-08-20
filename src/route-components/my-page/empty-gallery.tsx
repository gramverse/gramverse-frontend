import { useContext } from "react";
import { Button } from "../../reusable-components/button";
import { CreatePost } from "../post";
import { ModalContext } from "../main/main";

export const EmptyGallery = () => {
  const { setModal } = useContext(ModalContext);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
      </div>
      <div className="flex w-80">
        <Button
          classes="w-48 m-auto"
          type="submit"
          onClick={() => {
            setModal(<CreatePost post={null} />);
          }}
        >
          ایجاد پست جدید
        </Button>
      </div>
    </div>
  );
};

export const EmptyGalleryMobile = () => {
  const { setModal } = useContext(ModalContext);

  return (
    <div className="flex w-full h-[347px] flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="text-xl h-24 w-[311px] text-center font-bold leading-8">
        هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
      </div>
      <div className="flex w-72">
        <Button
          classes="w-48 m-auto"
          type="submit"
          onClick={() => {
            setModal(<CreatePost post={null} />);
          }}
        >
          ایجاد پست جدید
        </Button>
      </div>
    </div>
  );
};

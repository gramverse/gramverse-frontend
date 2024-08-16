import { useState } from "react";
import { Button } from "../../reusable-components/button";
import { Modal } from "../../reusable-components/modal";
import { CreatePost } from "../post";

export const EmptyGallery = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
  const Close = () => {
    setIsOpenCreatePost(false);
  };

  return (
    <div
      id="post-container"
      className="flex w-[952px] flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border px-16 py-12"
    >
      {isOpenCreatePost && (
        <Modal>
          <CreatePost id={null} Close={Close} />
        </Modal>
      )}
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
      </div>
      <div className="flex w-80">
        <Button
          classes="w-48 m-auto"
          type="submit"
          onClick={() => {
            setIsOpenCreatePost(true);
          }}
        >
          ایجاد پست جدید
        </Button>
      </div>
    </div>
  );
};

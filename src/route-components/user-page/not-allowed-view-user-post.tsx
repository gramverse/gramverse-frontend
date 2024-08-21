import { FollowMutationArgs } from "../../api-hooks/user-page";
import { Button } from "../../reusable-components/button";

type NotAllowedViewGalleryProps = {
  userName: string;
  onFollowMethod: (args: FollowMutationArgs) => void;
};
export const NotAllowedViewGallery = ({
  onFollowMethod,
  userName,
}: NotAllowedViewGalleryProps) => {
  return (
    <div className="mt-3 flex w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="size-5 h-[71px] w-[356px] text-center font-bold leading-8">
        {`برای دیدن صفحه ${userName} باید دنبالش کنی.`}
      </div>
      <Button
        type="submit"
        size="medium"
        onClick={() => {
          onFollowMethod({
            userName: userName,
            follow: true,
          });
        }}
      >
        {"+ دنبال کردن"}
      </Button>
    </div>
  );
};

export const NotAllowedViewGalleryMobile = ({
  onFollowMethod,
  userName,
}: NotAllowedViewGalleryProps) => {
  return (
    <div className="flex h-[347px] w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="h-24 w-[311px] text-center text-xl font-bold leading-8">
      {`برای دیدن صفحه ${userName} باید دنبالش کنی.`}
      </div>
      <div className="flex w-72">
        <Button
          type="submit"
          size="medium"
          onClick={() => {
            onFollowMethod?.({
              userName: userName,
              follow: true,
            });
          }}
        >
          {"+ دنبال کردن"}
        </Button>
      </div>
    </div>
  );
};

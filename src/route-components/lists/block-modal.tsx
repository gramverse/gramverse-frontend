import { UserInfoSummary } from "../../common/types/user";
import { Button } from "../../reusable-components/button";
import { ContainterWeb } from "../../reusable-components/container";
import { UserProfileSummary } from "../../reusable-components/user-profile-summary";

export const Block = ({
  user,
  close,
}: {
  user: UserInfoSummary | undefined;
  close: () => void;
}) => {
  return (
    <ContainterWeb className="mx-5 max-w-96">
      {user && (
        <div className="flex flex-col items-start gap-3">
          <UserProfileSummary
            userName={user.userName}
            profilePicture={user.profileImage}
            followerCount={user.followerCount}
          />
          <h5 className="text-start font-bold">{`مطمئنی میخوای ${user.userName} رو بلاک کنی؟`}</h5>
          <p className="text-start text-xs text-gray-500">
            اگر بلاکش کنی دیگه نمی‌تونه بهت پیام بده و پست‌هات رو ببینه. قابلیت
            لایک کردن و کامنت گذاشتن زیر پست‌های تو هم براش مسدود میشه.{" "}
          </p>

          <div className="flex self-end">
            <Button
              btnColor="transparent"
              onClick={() => {
                close();
              }}
            >
              {"پشیمون شدم"}
            </Button>
            <Button>{"آره، حتما"}</Button>
          </div>
        </div>
      )}
    </ContainterWeb>
  );
};

import { UserInfoSummary } from "../../common/types/user";
import { Button } from "../../reusable-components/button";
import { ContainterWeb } from "../../reusable-components/container";
import { UserProfileSummary } from "../../reusable-components/user-profile-summary";

export const Unclose = ({
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
            // profilePicture={user.profileImage}
            followerCount={user.followerCount}
          />
          <h5 className="text-start font-bold">{`مطمئنی میخوای ${user.userName} رو  از دوستان نزدینکت حذف کنی؟`}</h5>
          <p className="text-start text-xs text-gray-500">
            اگر از دوستان نزدینکت حذفش کنی؛ دیگه نمی‌تونه پیام‌های مخصوص دوستان
            نزدیک رو ببینه اما هنوز دوست تو باقی می‌مونه
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

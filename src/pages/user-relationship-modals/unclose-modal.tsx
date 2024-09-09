import { useAddCloseFriends } from "../../services/users";
import { UserInfoSummary } from "../../types/user";
import { Button } from "../../components/button";
import { ContainterWeb } from "../../components/container";
import { UserProfileSummary } from "../../components/user-profile-summary";
import profile from "../../assets/svg/profile.svg";

export const Unclose = ({
  user,
  close,
}: {
  user: UserInfoSummary | undefined;
  close: () => void;
}) => {
  const { mutate } = useAddCloseFriends(close);
  return (
    <ContainterWeb className="mx-5 max-w-96">
      {user && (
        <div className="flex flex-col items-start gap-3">
          <UserProfileSummary
            userName={user.userName}
            profilePicture={
              user.profileImage && user.profileImage !== ""
                ? user.profileImage
                : profile
            }
            followerCount={user.followerCount}
          />
          <h5 className="text-start font-bold">{`مطمئنی میخوای ${user.userName} رو  از دوستان نزدیکت حذف کنی؟`}</h5>
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
            <Button
              onClick={() => {
                mutate({ userName: user.userName, isAdd: false });
              }}
            >
              {"آره، حتما"}
            </Button>
          </div>
        </div>
      )}
    </ContainterWeb>
  );
};

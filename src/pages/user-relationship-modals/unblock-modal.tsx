import { useBlockUser } from "../../services/users";
import { UserInfoSummary } from "../../types/user";
import { Button } from "../../components/button";
import { ContainterWeb } from "../../components/container";
import { UserProfileSummary } from "../../components/user-profile-summary";
import profile from "@asset/svg/profile.svg";

export const Unblock = ({
  user,
  close,
}: {
  user: UserInfoSummary | undefined;
  close: () => void;
}) => {
  const { mutate } = useBlockUser(close);
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
          <h5 className="text-start font-bold">{`مطمئنی میخوای ${user.userName} رو آنبلاک کنی؟`}</h5>
          <p className="text-start text-xs text-gray-500">
            اگر آنبلاکش کنی می‌تونه بهت پیام بده و پست‌هات رو ببینه. قابلیت لایک
            کردن و کامنت گذاشتن زیر پست‌های تو هم براش باز میشه.
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
                mutate({
                  followingUserName: user.userName,
                  isBlock: false,
                });
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

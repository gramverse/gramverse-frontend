import { useAddCloseFriends } from "../../api-hooks/users";
import { UserInfoSummary } from "../../common/types/user";
import { Button } from "../../reusable-components/button";
import { ContainterWeb } from "../../reusable-components/container";
import { UserProfileSummary } from "../../reusable-components/user-profile-summary";
import PersonIcon from "../../assets/svg/profile.svg";

export const Close = ({
  user,
  close,
}: {
  user: UserInfoSummary | undefined;
  close: () => void;
}) => {
  const { mutate } = useAddCloseFriends(close);
  const profileImage =
    user?.profileImage && user.profileImage != ""
      ? user.profileImage
      : PersonIcon;
  return (
    <ContainterWeb className="mx-5 max-w-96">
      {user && (
        <div className="flex flex-col items-start gap-3">
          <UserProfileSummary
            userName={user.userName}
            profilePicture={profileImage}
            followerCount={user.followerCount}
          />
          <h5 className="text-start font-bold">{`مطمئنی میخوای ${user.userName} رو  به دوستان نزدیکت اضافه کنی؟`}</h5>
          <p className="text-start text-xs text-gray-500">
            در این صورت اون می‌تونه محتواهایی که برای دوستان نزدیکت به اشتراک
            گذاشتی رو ببینه.
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
                mutate({ userName: user.userName, isAdd: true });
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

import remove from "../../assets/svg/close-friend-remove.svg";
import { useFollowUser } from "../../api-hooks/user-page";
import { useRemoveFollower } from "../../api-hooks/my-page";
import { Tab } from "../../reusable-components/tab";
import { useNavigate } from "react-router-dom";
export const Menu = ({
  closeMenu,
  isOpen,
  follower,
  userName,
}: {
  closeMenu: () => void;
  isOpen: boolean;
  follower: boolean;
  userName: string;
}) => {
  const {
    isError: isFollowError,
    error: followError,
    mutate: unfollow,
  } = useFollowUser(userName);

  const {
    isError: isRemoveFollowerError,
    error: removeFollowerError,
    mutate: removeFollower,
  } = useRemoveFollower(userName);

  const followingOperation = follower ? removeFollower : unfollow;
  if (isFollowError) {
    console.log(followError);
    //use error handler
  }
  if (isRemoveFollowerError) {
    console.log(removeFollowerError);

    //use error handler
  }

  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text={follower ? "حذف از دنبال کننده ها" : "حذف از دنبال شونده ها"}
            icon={remove}
            onClick={() => {
              followingOperation();
              closeMenu();
            }}
          />
        </div>
      )}
    </>
  );
};

export const MenuMobile = ({
  closeMenu,
  isOpen,
  follower,
  userName,
  myUserName,
}: {
  closeMenu: () => void;
  isOpen: boolean;
  follower: boolean;
  userName: string;
  myUserName?: string;
}) => {
  const {
    isError: isFollowError,
    error: followError,
    mutate: unfollow,
  } = useFollowUser(userName);

  const {
    isError: isRemoveFollowerError,
    error: removeFollowerError,
    mutate: removeFollower,
  } = useRemoveFollower(userName);

  const followingOperation = follower ? removeFollower : unfollow;
  const navigate = useNavigate();
  if (isFollowError) {
    console.log(followError);
    //use error handler
  }
  if (isRemoveFollowerError) {
    console.log(removeFollowerError);

    //use error handler
  }

  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text={follower ? "حذف از دنبال کننده ها" : "حذف از دنبال شونده ها"}
            icon={remove}
            onClick={() => {
              followingOperation();
              closeMenu();
              navigate(`/${myUserName}`);
            }}
          />
        </div>
      )}
    </>
  );
};

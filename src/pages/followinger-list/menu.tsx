import remove from "../../assets/svg/close-friend-remove.svg";
import { useFollowUser } from "../../services/user-page";
import { useRemoveFollower } from "../../services/my-page";
import { Tab } from "../../components/tab";
import { useNavigate } from "react-router-dom";
export const Menu = ({
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
  myUserName: string;
}) => {
  const { mutate: unfollow } = useFollowUser(userName, myUserName);

  const { mutate: removeFollower } = useRemoveFollower(userName, myUserName);

  const followingOperation = follower ? removeFollower : unfollow;

  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text={follower ? "حذف از دنبال کننده ها" : "حذف از دنبال شونده ها"}
            icon={remove}
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
              followingOperation();
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
  myUserName: string;
}) => {
  const { mutate: unfollow } = useFollowUser(userName, myUserName);

  const { mutate: removeFollower } = useRemoveFollower(userName, myUserName);

  const followingOperation = follower ? removeFollower : unfollow;
  const navigate = useNavigate();

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

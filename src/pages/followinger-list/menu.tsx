import remove from "@asset/svg/close-friend-remove.svg";
import { useFollowUser } from "../../services/user-page";
import { useRemoveFollower } from "../../services/my-page";
import { Tab } from "../../components/tab";
import { useNavigate } from "react-router-dom";
import message from "@asset/svg/message.svg";

export const Menu = ({
  closeMenu,
  isOpen,
  follower,
  userName,
  pageUserName,
  openChat,
}: {
  closeMenu: () => void;
  isOpen: boolean;
  follower: boolean;
  userName: string;
  pageUserName: string;
  openChat?: () => void;
}) => {
  const { mutate: unfollow } = useFollowUser(userName, pageUserName);

  const { mutate: removeFollower } = useRemoveFollower(userName, pageUserName);

  const followingOperation = follower ? removeFollower : unfollow;
  const navigate = useNavigate();
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text="پیام"
            icon={message}
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
              openChat ? openChat() : navigate(`/chat/${userName}`);
            }}
          />
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
  pageUserName,
}: {
  closeMenu: () => void;
  isOpen: boolean;
  follower: boolean;
  userName: string;
  pageUserName: string;
}) => {
  const { mutate: unfollow } = useFollowUser(userName, pageUserName);

  const { mutate: removeFollower } = useRemoveFollower(userName, pageUserName);

  const followingOperation = follower ? removeFollower : unfollow;
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text="پیام"
            icon={message}
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
              navigate(`/chat/${userName}`);
            }}
          />
          <Tab
            text={follower ? "حذف از دنبال کننده ها" : "حذف از دنبال شونده ها"}
            icon={remove}
            onClick={(e) => {
              e.stopPropagation();
              followingOperation();
              closeMenu();
              navigate(`/${pageUserName}`);
            }}
          />
        </div>
      )}
    </>
  );
};

import { Tab } from "../../components/tab";
import block from "@asset/svg/blocked.svg";
import addCloseFriend from "@asset/svg/close-friend.svg";
import message from "@asset/svg/message.svg";

export const Menu = ({
  closeMenu,
  openModal,
  isOpen,
  canAddToCloseFriends,
  canBlock,
  canUnblock,
  canMessage,
}: {
  closeMenu: () => void;
  openModal: (arg: "block" | "close" | "unblock" | "message") => void;
  isOpen: boolean;
  canAddToCloseFriends: boolean;
  canMessage: boolean;
  canBlock: boolean;
  canUnblock: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          {canMessage && (
            <Tab
              text="پیام"
              icon={message}
              onClick={() => {
                closeMenu();
                openModal("message");
              }}
            />
          )}
          {canAddToCloseFriends && (
            <Tab
              text="افزودن به دوستان نزدیک"
              icon={addCloseFriend}
              onClick={() => {
                closeMenu();
                openModal("close");
              }}
            />
          )}
          {canBlock && (
            <Tab
              text="بلاک کردن"
              icon={block}
              onClick={() => {
                closeMenu();
                openModal("block");
              }}
            />
          )}
          {canUnblock && (
            <Tab
              text="آنبلاک کردن"
              icon={block}
              onClick={() => {
                closeMenu();
                openModal("unblock");
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

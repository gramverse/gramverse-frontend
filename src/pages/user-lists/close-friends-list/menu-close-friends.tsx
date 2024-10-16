import { Tab } from "../../../components/tab";
import block from "@asset/svg/blocked.svg";
import removeCloseFriend from "@asset/svg/close-friend-remove.svg";
import message from "@asset/svg/message.svg";
export const MenuCloseFriends = ({
  closeMenu,
  openModal,
  isOpen,
}: {
  closeMenu: () => void;
  openModal: (arg: "block" | "unclose" | "message") => void;
  isOpen: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text="پیام"
            icon={message}
            onClick={() => {
              closeMenu();
              openModal("message");
            }}
          />
          <Tab
            text="حدف از دوستان نزدیک"
            icon={removeCloseFriend}
            onClick={() => {
              closeMenu();
              openModal("unclose");
            }}
          />
          <Tab
            text="بلاک کردن"
            icon={block}
            onClick={() => {
              closeMenu();
              openModal("block");
            }}
          />
        </div>
      )}
    </>
  );
};

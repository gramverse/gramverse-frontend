import { Tab } from "../../reusable-components/tab";
import block from "../../assets/svg/blocked.svg";
import addCloseFriend from "../../assets/svg/close-friend.svg";
export const Menu = ({
  closeMenu,
  openModal,
  isOpen,
  canAddToCloseFriends,
  canBlock,
}: {
  closeMenu: () => void;
  openModal: (arg: "block" | "close") => void;
  isOpen: boolean;
  canAddToCloseFriends: boolean;
  canBlock: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
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
        </div>
      )}
    </>
  );
};

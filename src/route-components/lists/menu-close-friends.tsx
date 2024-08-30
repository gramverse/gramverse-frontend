import { Tab } from "../../reusable-components/tab";
import block from "../../assets/svg/blocked.svg";
import removeCloseFriend from "../../assets/svg/close-friend-remove.svg";
export const MenuCloseFriends = ({
  closeMenu,
  openModal,
  isOpen,
}: {
  closeMenu: () => void;
  openModal: (arg: "block" | "unclose") => void;
  isOpen: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-[200px] rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white px-5">
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

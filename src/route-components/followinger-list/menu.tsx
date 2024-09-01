import { Tab } from "../../reusable-components/tab";
import remove from "../../assets/svg/close-friend-remove.svg";
export const Menu = ({
  closeMenu,
  follower,
  isOpen,
}: {
  closeMenu: () => void;
  isOpen: boolean;
  follower: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text={follower ? "حذف از دنبال کننده ها" : "حذف از دنبال شونده ها"}
            icon={remove}
            onClick={() => {
              closeMenu();
              //api
            }}
          />
        </div>
      )}
    </>
  );
};

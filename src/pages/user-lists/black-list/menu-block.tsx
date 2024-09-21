import { Tab } from "../../../components/tab";
import blocked from "@asset/svg/blocked.svg";
export const MenuBlock = ({
  closeMenu,
  openModal,
  isOpen,
}: {
  closeMenu: () => void;
  openModal: () => void;
  isOpen: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-10 z-10 h-fit w-fit rounded-b-2xl rounded-tr-2xl border-2 border-solid border-gray-300 bg-white ps-2">
          <Tab
            text="حذف از بلاک ها"
            icon={blocked}
            onClick={() => {
              closeMenu();
              openModal();
            }}
          />
        </div>
      )}
    </>
  );
};

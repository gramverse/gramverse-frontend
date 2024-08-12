import clsx from "clsx";
import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";

export const DrawerMenu = ({
  isOpen,
  toggleDrawer,
  handleItemClick,
}: {
  toggleDrawer: () => void;
  handleItemClick: (item: string) => void;
  isOpen: boolean;
}) => {
  return (
    <div
      className={clsx(
        !isOpen && "-translate-y-full",

        "absolute z-20 w-screen h-screen flex flex-col items-end justify-end transition transform delay-75 duration-1000 ease-in-out "
      )}
      onClick={toggleDrawer}
    >
      <div className="w-screen h-1/2 bg-white rounded-t-3xl py-10 ps-10 shadow-lg border-2 border-solid border-gray-300 flex flex-col gap-3 ">
        {Object.values(itemList)
          .slice(0, 5)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                onClick={() => {
                  handleItemClick(Object.keys(itemList)[index]);
                  toggleDrawer();
                }}
              ></Tab>
            );
          })}
        {Object.values(itemList)
          .slice(7)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                onClick={() => {
                  handleItemClick(Object.keys(itemList)[7]);
                  toggleDrawer();
                }}
              ></Tab>
            );
          })}
      </div>
    </div>
  );
};

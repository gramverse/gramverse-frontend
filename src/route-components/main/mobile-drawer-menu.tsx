import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { useContext } from "react";
import { ModalContext } from "./main";
export const DrawerMenu = ({
  handleItemClick,
}: {
  handleItemClick: (item: string) => void;
}) => {
  const { setModal } = useContext(ModalContext);

  return (
    <div className="flex h-2/3 grow flex-col gap-3 self-end rounded-t-3xl border-2 border-solid border-gray-300 bg-white shadow-lg">
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
                setModal(null);
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
                setModal(null);
              }}
            ></Tab>
          );
        })}
    </div>
  );
};

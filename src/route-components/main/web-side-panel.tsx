import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { ProfileSummary } from "../../reusable-components/profile-summary";

export const Panel = ({
  handleClick,
  userName,
}: {
  handleClick: (tab: string) => void;
  userName: string;
}) => {

  return (
    <div className=" border-solid border-2 border-gray-300 w-80 flex-grow bg-white rounded-t-3xl flex flex-col pt-10">
      <ProfileSummary handleClick={handleClick} userName={userName} className="ms-10" />
      <section className="w-full items-start h-full p-5 pb-20 flex flex-col gap-5 relative">
        {Object.values(itemList)
          .slice(0, 5)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                onClick={() => handleClick(Object.keys(itemList)[index])}
              />
            );
          })}
        <div className="h-0.5 bg-gray-300 w-80 -ms-5" />

        {Object.values(itemList)
          .slice(5, 7)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                onClick={() => handleClick(Object.keys(itemList)[index + 5])}
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
                className="absolute bottom-4"
                onClick={() => handleClick(Object.keys(itemList)[index + 7])}
              ></Tab>
            );
          })}
      </section>
    </div>
  );
};

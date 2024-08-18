import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { ProfileSummary } from "../../reusable-components/profile-summary";

export const Panel = ({
  handleClick,
  selectedTab,
}: {
  handleClick: (tab: string) => void;
  selectedTab: string;
}) => {
  return (
    <div className="flex w-80 flex-grow flex-col rounded-t-3xl border-2 border-solid border-gray-300 bg-white pt-10">
      <ProfileSummary handleClick={handleClick} className="ms-10" />
      <section className="relative flex h-full w-full flex-col items-start gap-5 p-5 pb-20">
        {Object.values(itemList)
          .slice(0, 5)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                value={Object.keys(itemList)[index]}
                selectedValue={selectedTab}
                onClick={() => {
                  handleClick(Object.keys(itemList)[index]);
                }}
              />
            );
          })}
        <div className="-ms-5 h-0.5 w-80 bg-gray-300" />

        {Object.values(itemList)
          .slice(5, 7)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                value={Object.keys(itemList)[index + 5]}
                selectedValue={selectedTab}
                onClick={() => {
                  handleClick(Object.keys(itemList)[index + 5]);
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
                value={Object.keys(itemList)[index + 7]}
                selectedValue={selectedTab}
                className="absolute bottom-4"
                onClick={() => {
                  handleClick(Object.keys(itemList)[index + 7]);
                }}
              ></Tab>
            );
          })}
      </section>
    </div>
  );
};

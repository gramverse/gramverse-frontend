import { itemList } from "./menu-data";
import profile from "../../assets/svg/profile.svg";
import { Tab } from "../../reusable-components/tab";

export const Panel = ({
  handleChange,
  userName,
}: {
  handleChange: (tab: string) => void;
  userName: string;
}) => {
  return (
    <div className=" border-solid border-2 border-gray-300 w-80 h-screen bg-white rounded-t-3xl flex flex-col pt-10">
      <Tab
        key={userName}
        text={userName}
        icon={profile}
        iconSize={20}
        className="ms-11"
      />
      <section className="w-full items-start h-full p-5 pb-20 flex flex-col gap-5 relative">
        {Object.values(itemList)
          .slice(0, 5)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                onClick={() => handleChange(Object.keys(itemList)[index])}
              />
            );
          })}
        <hr className="bg-grey-100 h-0.5 w-80 -ms-5" />

        {Object.values(itemList)
          .slice(5, 7)
          .map(({ text, icon }, index) => {
            return (
              <Tab
                key={text + index}
                text={text}
                icon={icon}
                onClick={() => handleChange(Object.keys(itemList)[index + 5])}
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
                className="absolute bottom-40"
                onClick={() => handleChange(Object.keys(itemList)[index + 7])}
              ></Tab>
            );
          })}
      </section>
    </div>
  );
};

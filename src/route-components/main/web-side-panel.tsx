import { itemList } from "./menu-data";
import profile from "../../assets/svg/profile.svg";
import { Tab } from "../../reusable-components/tab";
import { useGetProfileSummary } from "../../api-hooks/main";
import { RoundPicture } from "../../reusable-components/profile-picture";

export const Panel = ({
  handleChange,
  userName,
}: {
  handleChange: (tab: string) => void;
  userName: string;
}) => {
  const { data: profileSummary } = useGetProfileSummary();

  return (
    <div className=" border-solid border-2 border-gray-300 w-80 h-screen bg-white rounded-t-3xl flex flex-col pt-10">
      <div className="flex gap-5 items-center ms-12">
        <RoundPicture
          picture={
            profileSummary?.profilePicture
              ? profileSummary.profilePicture
              : profile
          }
          onClick={() => handleChange("myPage")}
        />
        <span>
          {profileSummary?.userName ? profileSummary?.userName:userName}
        </span>
      </div>
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
        <div className="h-0.5 bg-gray-300 w-80 -ms-5" />

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

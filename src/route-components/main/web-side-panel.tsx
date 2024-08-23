import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { ProfileSummary } from "../../reusable-components/profile-summary";
import { useGetProfile } from "../../api-hooks/get-my-profile";
import { useNavigate } from "react-router-dom";

export const Panel = ({ tab }: { tab: string }) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetProfile();
  return (
    <div className="flex w-80 flex-grow flex-col rounded-t-3xl border-2 border-solid border-gray-300 bg-white pt-10">
      <ProfileSummary className="ms-10" />
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
                selectedValue={tab}
                onClick={() => {
                  isSuccess && navigate(`profile/${data.userName}`);
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
                selectedValue={tab}
                value={Object.keys(itemList)[index + 5]}
                onClick={() => {
                  navigate("/");
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
                selectedValue={tab}
                value={Object.keys(itemList)[index + 7]}
                className="absolute bottom-4"
                onClick={() => {}}
              ></Tab>
            );
          })}
      </section>
    </div>
  );
};

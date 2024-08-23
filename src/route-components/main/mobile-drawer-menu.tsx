import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../api-hooks/get-my-profile";
export const DrawerMenu = () => {
  const { data, isSuccess } = useGetProfile();
  const navigate = useNavigate();
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
              onClick={() => isSuccess && navigate(`profile/${data.userName}`)}
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
              onClick={() => {}}
            ></Tab>
          );
        })}
    </div>
  );
};

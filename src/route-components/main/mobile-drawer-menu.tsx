import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "../../common/types/profile-data";
export const DrawerMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const data = ProfileSchema.parse(queryClient.getQueryData(["getProfile"]));
  return (
    <div className="flex flex-col gap-3 rounded-t-3xl border-2 border-solid border-gray-300 bg-white shadow-lg">
      {Object.values(itemList)
        .slice(0, 5)
        .map(({ text, icon }, index) => {
          return (
            <Tab
              key={text + index}
              text={text}
              icon={icon}
              onClick={() => {
                setTimeout(() => {
                  if (data.userName) {
                    navigate(`/profile/${data.userName}`);
                  } else {
                    navigate("/");
                  }
                }, 490);
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
              onClick={() => {}}
            ></Tab>
          );
        })}
    </div>
  );
};

import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "../../common/types/profile-data";
import friend from "../../assets/svg/close-friend.svg";
import blocked from "../../assets/svg/blocked.svg";
export const DrawerMenu = ({ close }: { close: () => void }) => {
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
                close();
                if (data.userName) {
                  navigate(`/${data.userName}`);
                } else {
                  navigate("/");
                }
              }}
            ></Tab>
          );
        })}

      <Tab
        text="دوستان نزدیک"
        icon={friend}
        onClick={() => {
          close();
          navigate("/close-friends");
        }}
      />
      <Tab
        text="لیست سیاه"
        icon={blocked}
        onClick={() => {
          close();
          navigate("/black-list");
        }}
      />
    </div>
  );
};

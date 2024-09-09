import { itemList } from "./menu-data";
import { Tab } from "../../components/tab";
import { useNavigate } from "react-router-dom";
import friend from "../../assets/svg/close-friend.svg";
import blocked from "../../assets/svg/blocked.svg";
import { useSignOut } from "../../services/signout";
import { useGetProfile } from "../../services/get-my-profile";
export const DrawerMenu = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();
  const { mutate: singOut } = useSignOut();
  const { data, isSuccess } = useGetProfile();

  return (
    <div className="flex flex-col gap-3 rounded-t-3xl border-2 border-solid border-gray-300 bg-white shadow-lg">
      <Tab
        key={itemList["myPage"].text}
        text={itemList["myPage"].text}
        icon={itemList["myPage"].icon}
        value={"myPage"}
        onClick={() => {
          close();
          isSuccess && navigate(`${data.userName}`);
        }}
      />
      <Tab
        key={itemList["saved"].text}
        text={itemList["saved"].text}
        icon={itemList["saved"].icon}
        value={"saved"}
        onClick={() => {}}
      />
      <Tab
        key={itemList["messages"].text}
        text={itemList["messages"].text}
        icon={itemList["messages"].icon}
        value={"messages"}
        onClick={() => {}}
      />
      <Tab
        key={itemList["notifs"].text}
        text={itemList["notifs"].text}
        icon={itemList["notifs"].icon}
        value={"notifs"}
        onClick={() => {
          close();
          navigate("/my-notifications");
        }}
      />
      <Tab
        key={itemList["mention"].text}
        text={itemList["mention"].text}
        icon={itemList["mention"].icon}
        value={"mention"}
        onClick={() => {
          close();
          isSuccess && navigate(`${data.userName}`);
        }}
      />
      <Tab
        key={itemList["signOut"].text}
        text={itemList["signOut"].text}
        icon={itemList["signOut"].icon}
        value={"signOut"}
        onClick={() => {
          close();
          singOut();
        }}
      />
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

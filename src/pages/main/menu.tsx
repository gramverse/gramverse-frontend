import { Tab } from "../../components/tab";
import friend from "../../assets/svg/close-friend.svg";
import blocked from "../../assets/svg/blocked.svg";
import { useNavigate } from "react-router-dom";
export const Menu = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-20 right-10 z-10 h-fit w-fit rounded-t-2xl rounded-bl-2xl border-2 border-solid border-gray-300 bg-white ps-2">
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

import { Tab } from "./tab";
import { useNavigate } from "react-router-dom";

export const TwinTab = ({
  tab1,
  tab2,
  tab,
}: {
  tab1: { text: string; url: string };
  tab2: { text: string; url: string };
  tab: number;
}) => {
  const navigate = useNavigate();

  return (
    <div className="my-5 flex grow justify-center gap-6">
      <Tab
        text={tab1.text}
        className="w-fit"
        value="0"
        selectedValue={`${tab}`}
        selectedStyle="text"
        onClick={() => {
          navigate(tab1.url);
        }}
      ></Tab>
      <div className="h-10 w-0.5 bg-gray-400" />

      <Tab
        text={tab2.text}
        className="w-fit"
        value="1"
        selectedValue={`${tab}`}
        selectedStyle="text"
        onClick={() => {
          navigate(tab2.url);
        }}
      ></Tab>
    </div>
  );
};

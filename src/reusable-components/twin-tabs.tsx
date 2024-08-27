import { useEffect } from "react";
import { Tab } from "./tab";
import { useNavigate } from "react-router-dom";

export const TwinTab = ({
  tab1,
  tab2,
  tab,
  setTab,
}: {
  tab1: { text: string; url: string };
  tab2: { text: string; url: string };
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    switch (tab) {
      case 0:
        navigate(tab1.url);
        break;
      case 1:
        navigate(tab2.url);
    }
  }, [tab, navigate, tab1.url, tab2.url]);

  return (
    <div className="my-5 flex grow justify-center gap-6">
      <Tab
        text={tab1.text}
        className="w-fit"
        value="0"
        selectedValue={`${tab}`}
        selectedStyle="text"
        onClick={() => {
          setTab(0);
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
          setTab(1);
        }}
      ></Tab>
    </div>
  );
};

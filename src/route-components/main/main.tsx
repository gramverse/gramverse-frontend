import { useLocation, useNavigate } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { Box, Divider } from "@mui/material";
import { SubmitBtn } from "../../reusable-components/submit-btn";
import PlusIcon from "../../assets/svg/plus-round.svg";
import plus from "../../assets/svg/plus.svg";
import profile from "../../assets/svg/profile.svg";
import React, { useEffect, useState } from "react";
import { urls } from "../../common/routes";
import { Explore } from "../explore";
import { MyPage } from "../my-page";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import menu from "../../assets/svg/menu.svg";
import { Panel } from "./web-side-panel";
import { DrawerMenu } from "./mobile-drawer-menu";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export const Main = () => {
  // const { state } = useLocation();

  const state = { username: "reyhaneh", login: false };
  const [value, setValue] = React.useState(6);
  const navigate = useNavigate();
  useEffect(() => {
    switch (value) {
      case 0:
        navigate(urls.main + state.username);
        break;
    }
  }, [value, navigate]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="overflow-hidden bg-color h-dvh flex ">
      <div className=" bg-[#f5f5f5] p-16 w-screen flex justify-stretch">
        <img src={rahnema} className="absolute left-20" alt="" />
        <div className="self-start flex flex-col gap-5 items-center w-fit">
          <SubmitBtn className="gap-3 px-5" size="medium">
            <img src={PlusIcon}></img>
            ایجاد پست جدید
          </SubmitBtn>
          <Panel
            value={value}
            handleChange={handleChange}
            username={state.username}
          />
          <div className="flex flex-col"></div>
        </div>
        <div className="w-full flex justify-center items-center">
          <CustomTabPanel value={value} index={6}>
            <Explore login={state.login} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={0}>
            <MyPage />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
};

export const MainMobile = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  const state = { username: "reyhaneh", login: false };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("اکسپلور");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    switch (item) {
      case "صفحه من":
        navigate(urls.myPage);
        break;
      case "اکسپلور":
        navigate(urls.main);
        break;
    }

    // You can perform additional actions here based on the selected item
  };
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-screen bgColor h-screen flex flex-col relative justify-center ">
      <div className="h-fit flex flex-col justify-center absolute top-0">
        <div className="flex flex-row justify-between w-screen h-fit  p-5">
          <button
            className="border-none rounded-full w-fit h-fit bgColor"
            onClick={() => handleItemClick("صفحه من")}
          >
            <img src={profile} alt="" />
          </button>
          <button className="border-none rounded-full w-12 h-13 bgColor">
            <img src={menu} alt="" />
          </button>
        </div>
        <Divider />
      </div>
      {selectedItem === "اکسپلور" && <Explore login={state.login} />}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <button
          className="redColor border-none w-12 h-12 rounded-full"
          onClick={toggleDrawer}
        >
          <img src={plus} alt="" />
        </button>
      </div>
      <DrawerMenu
        isOpen={isOpen}
        handleItemClick={handleItemClick}
        toggleDrawer={toggleDrawer}
      />
      <MobileBottomNavigation handleItemClick={handleItemClick} />
    </div>
  );
};

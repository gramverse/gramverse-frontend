import { useLocation, useNavigate } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { Button } from "../../reusable-components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import React, { useEffect, useState } from "react";
import { urls } from "../../common/routes";
import { Explore } from "../explore";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { DrawerMenu } from "./mobile-drawer-menu";

export const Main = () => {
  const { state } = useLocation();
  // const state = { username: "reyhaneh", login: true };
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?.username) {
      navigate(urls.login);
    }
  });
  const [tab, setTab] = React.useState("explore");
  useEffect(() => {
    console.log(tab);
    switch (tab) {
      case "myPage":
        navigate(state?.username);
        break;
    }
  }, [tab, navigate, state?.username]);

  const handleChange = (newValue: string) => {
    setTab(newValue);
  };
  return (
    <div className="bg-color h-dvh flex ">
      <div className=" bgColor p-16 w-screen flex justify-stretch">
        <img src={rahnema} className="absolute left-20" alt="" />
        <div className="self-start flex flex-col gap-5 items-center w-fit">
          <Button className="flex items-center justify-center">
            <img src={PlusIcon} alt="" />
            <span>ایجاد پست جدید</span>
          </Button>
          <Panel handleChange={handleChange} username={state?.username} />
        </div>
        <div className="w-full flex justify-center items-center">
          {tab === "explore" && <Explore login={state?.login} />}
        </div>
      </div>
    </div>
  );
};

export const MainMobile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const state = { username: "reyhaneh", login: true };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("explore");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!state?.username) {
      navigate(urls.login);
    }
  });
  useEffect(() => {
    switch (selectedItem) {
      case "myPage":
        navigate(state.username);
    }
  }, [selectedItem, navigate, state?.username]);

  return (
    <div className="bgColor w-full h-screen flex flex-col items-center justify-center relative">
      {isOpen && (
        <DrawerMenu
          isOpen={isOpen}
          handleItemClick={handleItemClick}
          toggleDrawer={toggleDrawer}
        />
      )}
      {selectedItem === "explore" && <Explore login={state?.login} />}
      <MobileBottomNavigation
        handleItemClick={handleItemClick}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

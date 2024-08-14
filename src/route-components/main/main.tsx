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
import { ContainterMobile } from "../../reusable-components/container";
import { CreatePost } from "../create-post";
import { Modal } from "../../reusable-components/modal";
import { MyPage } from "../my-page/my-page";
import MobileTopNavigation from "./mobile-top-navigation";

export const Main = () => {
  const { state } = useLocation();
  // const state = { username: "reyhaneh", login: true };
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?.userName) {
      navigate(urls.login);
    }
  });
  const [tab, setTab] = React.useState("explore");
  // useEffect(() => {
  //   console.log(tab);
  //   switch (tab) {
  //     case "myPage":
  //       navigate(state?.username);
  //       break;
  //   }
  // }, [tab, navigate, state?.username]);
  const handleChange = (newValue: string) => {
    setTab(newValue);
  };
  const [isOpen, setIsOpen] = useState(false);
  const Close = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-color h-screen w-screen flex relative ">
      {isOpen && (
        <Modal>
          <CreatePost Close={Close} />
        </Modal>
      )}
      <div className=" bgColor p-16 w-screen flex justify-stretch">
        <img src={rahnema} className="absolute left-20" alt="" />
        <div className="self-start flex flex-col gap-5 items-center w-fit">
          <Button
            classes="flex items-center justify-center"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <img src={PlusIcon} alt="" />
            <span>ایجاد پست جدید</span>
          </Button>
          <Panel handleChange={handleChange} userName={state?.userName} />
        </div>
        <div className="w-full flex justify-center items-center">
          {tab === "explore" && <Explore login={state?.login} />}
          {tab == "myPage" && <MyPage></MyPage>}
        </div>
      </div>
    </div>
  );
};

export const MainMobile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const state = { userName: "reyhaneh", login: true };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("explore");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!state?.userName) {
      navigate(urls.login);
    }
  });
  // useEffect(() => {
  //   switch (selectedItem) {
  //     case "myPage":
  //       navigate(state.username);
  //   }
  // }, [selectedItem, navigate, state?.username]);

  return (
    <ContainterMobile>
      <MobileTopNavigation
        handleItemClick={handleItemClick}
        toggleDrawer={toggleDrawer}
      />
      {isOpen && (
        <DrawerMenu
          isOpen={isOpen}
          handleItemClick={handleItemClick}
          toggleDrawer={toggleDrawer}
        />
      )}
      {selectedItem === "explore" && <Explore login={state?.login} />}
      {selectedItem === "myPage" && <MyPage />}
      <MobileBottomNavigation handleItemClick={handleItemClick} />
    </ContainterMobile>
  );
};

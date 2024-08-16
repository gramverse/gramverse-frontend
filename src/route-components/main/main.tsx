import { useLocation } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { Button } from "../../reusable-components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import React, { useState } from "react";
import { Explore } from "../explore";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { DrawerMenu } from "./mobile-drawer-menu";
import { ContainterMobile } from "../../reusable-components/container";
import { CreatePost, CreatePostMobile } from "../post";
import { Modal } from "../../reusable-components/modal";
import { MyPage } from "../my-page/my-page";
import MobileTopNavigation from "./mobile-top-navigation";

export const Main = () => {
  const { state } = useLocation();
  // const state = { userName: "reyhaneh", login: true };
  const [tab, setTab] = React.useState("explore");

  const handleClick = (newValue: string) => {
    setTab(newValue);
  };
  const [isOpen, setIsOpen] = useState(false);
  const Close = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-color relative flex h-screen w-screen">
      {isOpen && (
        <Modal>
          <CreatePost post={null} Close={Close} />
        </Modal>
      )}
      <div className="bgColor flex grow flex-row justify-stretch px-16 pt-16">
        <img src={rahnema} className="absolute left-20" alt="" />
        <div className="flex h-full w-fit flex-col items-center gap-5 self-start">
          <Button
            classes="flex items-center justify-center"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <img src={PlusIcon} alt="" />
            <span>ایجاد پست جدید</span>
          </Button>
          <Panel handleClick={handleClick} userName={state?.userName} />
        </div>
        <div className="flex w-full items-center justify-center">
          {tab === "explore" && <Explore login={state?.login} />}
          {tab == "myPage" && <MyPage></MyPage>}
        </div>
      </div>
    </div>
  );
};

export const MainMobile = () => {
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

  return (
    <ContainterMobile>
      {
        <MobileTopNavigation
          handleItemClick={handleItemClick}
          toggleDrawer={toggleDrawer}
        />
      }
      {isOpen && (
        <DrawerMenu
          isOpen={isOpen}
          handleItemClick={handleItemClick}
          toggleDrawer={toggleDrawer}
        />
      )}
      {selectedItem === "explore" && <Explore login={state?.login} />}
      {selectedItem === "myPage" && <MyPage />}
      {selectedItem === "createPost" && (
        <CreatePostMobile
          post={null}
          Close={() => {
            handleItemClick("explore");
          }}
        />
      )}
      {selectedItem !== "createPost" && (
        <MobileBottomNavigation handleItemClick={handleItemClick} />
      )}
    </ContainterMobile>
  );
};

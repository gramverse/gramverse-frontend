import { Outlet, useNavigate, useParams } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { Button } from "../../reusable-components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import { useCallback, useEffect, useState } from "react";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { DrawerMenu } from "./mobile-drawer-menu";
import { ContainterMobile } from "../../reusable-components/container";
import { CreatePost, CreatePostMobile } from "../post";
import { Modal } from "../../reusable-components/modal";
import MobileTopNavigation from "./mobile-top-navigation";
import { useGetProfile } from "../../api-hooks/get-my-profile";
import { urls } from "../../common/routes";
import { ContextType } from "./outlet-context";

export const Main = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  const { data } = useGetProfile();
  const handleClick = (newValue: string) => {
    setTab(newValue);
  };
  const [isOpen, setIsOpen] = useState(false);
  const Close = () => {
    setIsOpen(false);
  };

  const changeTab = useCallback(() => {
    switch (tab) {
      case "myPage":
        navigate(`/${data?.userName}`);
        break;
      case "explore":
        navigate(urls.main);
        break;
    }
    console.log(tab);
  }, [data?.userName, navigate, tab]);

  useEffect(() => {
    changeTab();
  }, [changeTab, data?.userName, navigate, params.userName, tab]);

  return (
    <div className="bg-color static flex h-screen w-screen">
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
          <Panel handleClick={handleClick} selectedTab={tab} />
        </div>
        <div className="flex w-full items-center justify-center">
          <Outlet context={{ setTab } satisfies ContextType} />
        </div>
      </div>
    </div>
  );
};

export const MainMobile = () => {
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

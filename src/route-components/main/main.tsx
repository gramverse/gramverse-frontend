import { Outlet, useLocation, useNavigate } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { Button } from "../../reusable-components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import { useEffect, useState } from "react";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { ContainterMobile } from "../../reusable-components/container";
import MobileTopNavigation from "./mobile-top-navigation";

export const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    switch (true) {
      case location.pathname.startsWith("/profile"):
        setTab("myPage");
        break;
      case location.pathname == "/":
        setTab("explore");
    }
  }, [location.pathname]);

  return (
    <div className="flex h-full grow bg-primary">
      <div className="flex grow flex-row justify-stretch bg-primary px-5 pt-16">
        <img src={rahnema} className="absolute left-20" alt="" />
        <div className="flex h-full w-fit flex-col items-center gap-5 self-start">
          <Button
            classes="flex items-center justify-center"
            onClick={() => {
              navigate("/create-post");
            }}
          >
            <img src={PlusIcon} alt="" />
            <span>ایجاد پست جدید</span>
          </Button>
          <Panel tab={tab} />
        </div>
        <div className="flex grow items-center justify-center px-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const MainMobile = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    switch (true) {
      case location.pathname.startsWith("/profile"):
        setTab("myPage");
        break;
      case location.pathname == "/":
        setTab("explore");
        break;
      case location.pathname.startsWith("/create-post"):
        setTab("create-post");
        break;
      case location.pathname.startsWith("/post/"):
        setTab("postView");
        break;
    }
  }, [location.pathname]);

  return (
    <ContainterMobile>
      {tab !== "postView" && <MobileTopNavigation />}
      <div className="flex grow flex-col">
        <Outlet />
      </div>
      {tab !== "create-post" && <MobileBottomNavigation />}
    </ContainterMobile>
  );
};

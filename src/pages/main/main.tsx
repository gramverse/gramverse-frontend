import { Outlet, useLocation, useNavigate } from "react-router-dom";
import rahnema from "@asset/svg/rahnema.svg";
import { useContext, useEffect, useState } from "react";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { ContainterMobile } from "../../components/container";
import MobileTopNavigation from "./mobile-top-navigation";
import { UserNameContext } from "../../router/Router";
export const Main = () => {
  const location = useLocation();
  const [tab, setTab] = useState("explore");
  const navigate = useNavigate();
  const myUserName = useContext(UserNameContext);
  useEffect(() => {
    switch (true) {
      case location.pathname.includes(myUserName):
        setTab("myPage");
        break;
      case location.pathname == "/" || location.pathname == "":
        setTab("explore");
        break;
      case location.pathname.includes("notifications"):
        setTab("notifs");
        break;
      case location.pathname.includes("mention-page"):
        setTab("mention");
        break;
      case location.pathname.includes("bookmark-page"):
        setTab("saved");
        break;
      case location.pathname.includes("add-account"):
        setTab("addAccount");
        break;
      case location.pathname.includes("close-friends") ||
        location.pathname.includes("black-list"):
        setTab("more");

        break;
      case location.pathname.includes("search"):
        setTab("search");
    }
  }, [location.pathname, myUserName, navigate]);

  return (
    <div className="box-border flex h-full grow flex-row items-start bg-primary px-5 pt-16">
      <img src={rahnema} className="absolute left-20" alt="" />
      <div className="flex h-full w-fit flex-col items-center gap-5 self-start">
        <Panel tab={tab} />
      </div>
      <div className="flex h-full grow flex-col items-center justify-center px-12">
        <Outlet />
      </div>
    </div>
  );
};

export const MainMobile = () => {
  const location = useLocation();
  const [buttomNavigation, showBottomNavigation] = useState(true);
  const [topNavigation, showTopNavigation] = useState(true);
  useEffect(() => {
    if (
      location.pathname.endsWith("/edit") ||
      location.pathname.endsWith("/create-post")
    ) {
      showBottomNavigation(false);
    } else {
      showBottomNavigation(true);
    }
  }, [location.pathname]);
  useEffect(() => {
    if (
      location.pathname.includes("/post") ||
      location.pathname.includes("search")
    ) {
      showTopNavigation(false);
    } else {
      showTopNavigation(true);
    }
  }, [location.pathname]);
  return (
    <ContainterMobile className="overflow-y-scroll">
      {topNavigation && <MobileTopNavigation />}
      <Outlet />
      {buttomNavigation && <MobileBottomNavigation />}
    </ContainterMobile>
  );
};

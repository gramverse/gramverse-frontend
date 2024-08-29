import { Outlet, useLocation, useNavigate } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { useEffect, useState } from "react";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { ContainterMobile } from "../../reusable-components/container";
import MobileTopNavigation from "./mobile-top-navigation";
import { useGetProfile } from "../../api-hooks/get-my-profile";

export const Main = () => {
  const location = useLocation();
  const [tab, setTab] = useState("explore");
  const navigate = useNavigate();

  useEffect(() => {
    switch (true) {
      case location.pathname.startsWith("/profile"):
        setTab("myPage");
        break;
      case location.pathname == "/" || location.pathname == "":
        setTab("explore");
        break;
      case location.pathname.includes("close-friends") ||
        location.pathname.includes("black-list"):
        setTab("more");
        break;
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex grow flex-row items-start h-full bg-primary px-5 pt-16 box-border">
      <img src={rahnema} className="absolute left-20" alt="" />
      <div className="flex h-full w-fit flex-col items-center gap-5 self-start">
        <Panel tab={tab} />
      </div>
      <div className="flex grow flex-col h-full items-center justify-center px-12">
        <Outlet />
      </div>
    </div>
    );
};

export const MainMobile = () => {
  const location = useLocation();
  const [, setTab] = useState("");
  const { data: profileSummary, isFetched } = useGetProfile();
  const navigate = useNavigate();
  const [buttomNavigation, showBottomNavigation] = useState(true);
  const [topNavigation, showTopNavigation] = useState(true);
  useEffect(() => {
    if (isFetched) {
      if (!profileSummary) {
        navigate("/login");
      }
    }
  }, [profileSummary, isFetched, navigate]);
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
    if (location.pathname.startsWith("/post/")) {
      showTopNavigation(false);
    } else {
      showTopNavigation(true);
    }
  }, [location.pathname]);
  useEffect(() => {
    switch (true) {
      case location.pathname.startsWith("/profile"):
        setTab("myPage");
        break;
      case location.pathname == "/" || location.pathname == "":
        setTab("explore");
        break;
    }
  }, [location.pathname, navigate]);
  return (
    <ContainterMobile>
      {topNavigation && (
        <MobileTopNavigation
          userName={profileSummary?.userName}
          profileImage={profileSummary?.profileImage}
        />
      )}
      <div className="flex grow flex-col">
        <Outlet />
      </div>
      {buttomNavigation && <MobileBottomNavigation />}
    </ContainterMobile>
  );
};

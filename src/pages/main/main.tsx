import { Outlet, useLocation, useNavigate } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { useEffect, useState } from "react";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { ContainterMobile } from "../../components/container";
import MobileTopNavigation from "./mobile-top-navigation";
import { useGetProfile } from "../../services/get-my-profile";

export const Main = () => {
  const location = useLocation();
  const [tab, setTab] = useState("explore");
  const navigate = useNavigate();
  const { data: myProfile } = useGetProfile();
  useEffect(() => {
    switch (true) {
      case myProfile?.userName &&
        location.pathname.includes(myProfile?.userName):
        setTab("myPage");
        break;
      case location.pathname == "/" || location.pathname == "":
        setTab("explore");
        break;
      case location.pathname.includes("notifications"):
        setTab("notifs");
        break;
      case location.pathname.includes("close-friends") ||
        location.pathname.includes("black-list"):
        setTab("more");
        break;
      default:
        setTab("search");
        break;
    }
  }, [location.pathname, myProfile?.userName, navigate]);

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
    if (location.pathname.includes("/post")) {
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
    <ContainterMobile className="overflow-y-scroll">
      {topNavigation && (
        <MobileTopNavigation
          userName={profileSummary?.userName}
          profileImage={profileSummary?.profileImage}
        />
      )}
      <Outlet />
      {buttomNavigation && <MobileBottomNavigation />}
    </ContainterMobile>
  );
};

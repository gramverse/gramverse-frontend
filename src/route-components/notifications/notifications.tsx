import clsx from "clsx";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TwinTab } from "../../reusable-components/twin-tabs";

export const NotificationLayout = ({ mobile }: { mobile: boolean }) => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    switch (true) {
      case location.pathname.includes("my-notifications"):
        setValue(0);
        break;
      case location.pathname.includes("friends-notifications"):
        setValue(1);
    }
  }, [location.pathname]);

  return (
    <div
      className={clsx(
        "mb-7 flex w-full grow flex-col items-center justify-start gap-7 overflow-y-scroll bg-primary text-center",
      )}
    >
      <TwinTab
        className={clsx(!mobile && "self-start")}
        tab1={{ text: " اعلانات من", url: "/my-notifications" }}
        tab2={{ text: " اعلانات دوستان من", url: "/friends-notifications" }}
        tab={value}
      />
      <Outlet />
    </div>
  );
};

export const Notification = () => {
  return <NotificationLayout mobile={false} />;
};

export const NotificationMobile = () => {
  return <NotificationLayout mobile={true} />;
};

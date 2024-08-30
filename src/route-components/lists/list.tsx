import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { TwinTab } from "../../reusable-components/twin-tabs";
import clsx from "clsx";

export const ListLayout = ({ mobile }: { mobile: boolean }) => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    switch (true) {
      case location.pathname.includes("close-friends"):
        setValue(0);
        break;
      case location.pathname.includes("black-list"):
        setValue(1);
    }
  }, [location.pathname]);

  return (
    <div
      className={clsx(
        "mb-7 flex grow flex-col items-center justify-start gap-7 overflow-y-scroll bg-primary text-center",
        mobile ? "w-full" : "w-96 self-start",
      )}
    >
      <TwinTab
        className={clsx(!mobile && "self-start")}
        tab1={{ text: "دوستان نزدیک", url: "/close-friends" }}
        tab2={{ text: "لیست سیاه", url: "/black-list" }}
        tab={value}
      />
      <Outlet />
    </div>
  );
};

export const List = () => {
  return <ListLayout mobile={false} />;
};

export const ListMobile = () => {
  return <ListLayout mobile={true} />;
};

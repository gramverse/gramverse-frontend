import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { ContainterMobile } from "../../reusable-components/container";
import { TwinTab } from "../../reusable-components/twin-tabs";

export const ListLayout = () => {
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
    <div className="h-[800px] w-[300px] grow items-center justify-center gap-5 bg-primary text-center">
      <div className="my-5 flex grow justify-center gap-6">
        <TwinTab
          tab1={{ text: "دوستان نزدیک", url: "/close-friends" }}
          tab2={{ text: "لیست سیاه", url: "/black-list" }}
          tab={value}
        />
      </div>
      <div className="flex grow flex-col items-start">
        <Outlet />
      </div>
    </div>
  );
};

export const List = () => {
  return <ListLayout />;
};

export const ListMobile = () => {
  return (
    <ContainterMobile>
      <ListLayout />
    </ContainterMobile>
  );
};

import background from "../assets/svg/background.svg";
import { Outlet } from "react-router-dom";

export const CollegeBackground = () => {
  return (
    <div
      className="z-0 flex h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <Outlet />
    </div>
  );
};

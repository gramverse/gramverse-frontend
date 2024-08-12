import { ReactNode } from "react";
import background from "../assets/svg/background.svg";

export const CollegeBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="w-full h-screen bgColor flex justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};

import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import CheckMark from "../assets/svg/check-mark.svg";
import Error from "../assets/svg/error.svg";

const fieldSizes: Record<fieldSizeTypes, string> = {
  small: "h-8 px-2  gap-2 rounded-xl text-sm",
  medium: "h-10 px-4 gap-3 rounded-2xl text-md ",
  large: " h-12 px-5  gap-4 rounded-3xl text-lg ",
};

const Status: Record<statusTypes, string> = {
  success: "bg-[#C3F9C2]",
  error: "bg-red-300 text-red-800",
};

interface AlertProps extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  fieldSize?: fieldSizeTypes;
  status: statusTypes;
  message: string;
  children?: ReactNode;
  time?: number;
}

type fieldSizeTypes = "small" | "medium" | "large";
type statusTypes = "error" | "success";
export const Alert = (props: AlertProps) => {
  const {
    fieldSize = "medium",
    status,
    message,
    className,
    children,
    time = 5,
  } = props;
  const [visible, setVisibility] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    }, time * 1000);
  }, [time]);
  return (
    <>
      {visible && (
        <div
          className={`flex items-center gap-2 py-2 w-fit px-5 m-5 ${fieldSizes[fieldSize]} ${Status[status]} ${className}`}
        >
          <span> {message}</span>
          <img
            src={
              status === "error" ? Error : status == "success" ? CheckMark : ""
            }
            className=" m-2 h-3/4"
            alt=""
          />
          {children}
        </div>
      )}
    </>
  );
};

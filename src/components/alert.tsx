import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import CheckMark from "@asset/svg/check-mark-green.svg";
import Error from "@asset/svg/error.svg";
import clsx from "clsx";

const fieldSizes: Record<fieldSizeTypes, string> = {
  small: "h-8 px-2  gap-2 rounded-xl text-sm",
  medium: "h-10 px-4 gap-3 rounded-xl text-sm ",
  large: " h-12 px-5  gap-4 rounded-3xl text-lg ",
};

const Status: Record<statusTypes, string> = {
  success: "bg-[#C3F9C2]",
  error: "bg-red-300 text-red-800",
};

interface AlertProps extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  fieldSize?: fieldSizeTypes;
  status: statusTypes;
  message: string | undefined;
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
  const [visible, setVisibility] = useState(false);
  const [id, setId] = useState<number>();
  useEffect(() => {
    if (message) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [message]);
  useEffect(() => {
    clearInterval(id);
    if (visible) {
      setId(
        window.setTimeout(() => {
          setVisibility(false);
        }, time * 1000),
      );
    }
  }, [time, visible, message]);
  return (
    <div className="m-2 h-12 overflow-hidden">
      <div
        className={clsx(
          `flex w-fit min-w-10 items-center gap-4 px-2 transition-transform ${fieldSizes[fieldSize]} ${Status[status]} ${className}`,
          visible && "",
          !visible && "translate-y-14",
        )}
      >
        <span className="text-xs"> {message}</span>
        <img
          src={
            status === "error" ? Error : status == "success" ? CheckMark : ""
          }
          className="h-1/2"
          alt=""
        />
        {children}
      </div>
    </div>
  );
};

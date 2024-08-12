import clsx from "clsx";
import { HTMLAttributes } from "react";

interface customTapProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  text: string;
  iconSize?: number;
}
export const Tab = ({
  icon,
  text,
  iconSize = 6,
  className,
  ...props
}: customTapProps) => {
  return (
    <div
      className={clsx(
        " m-1 ps-2 flex items-center gap-5 justify-start",
        className
      )}
      {...props}
    >
      <img src={icon} className={`h-${iconSize} m-2`} alt="" />
      <span className="text-md">{text}</span>
    </div>
  );
};

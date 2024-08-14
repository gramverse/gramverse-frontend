import clsx from "clsx";
import { HTMLAttributes } from "react";

interface customTapProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  text: string;
  iconSize?: number;
}
export const Tab = ({
  icon = "",
  text,
  iconSize = 6,
  className,
  ...props
}: customTapProps) => {
  return (
    <div
      className={clsx(" m-1 w-fit p-0 flex items-center gap-5", className)}
      {...props}
    >
      {icon && <img src={icon} className={`h-${iconSize} m-2`} alt="" />}
      <span className="text-md">{text}</span>
    </div>
  );
};

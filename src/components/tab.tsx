import clsx from "clsx";
import { HTMLAttributes } from "react";

interface customTapProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  text: string;
  iconSize?: number;
  value?: string;
  selectedValue?: null | string;
  selectedStyle?: "text" | "background";
}
export const Tab = ({
  icon = "",
  text,
  iconSize = 6,
  className,
  value = "",
  selectedValue = null,
  selectedStyle = "background",
  ...props
}: customTapProps) => {
  return (
    <div
      className={clsx(
        "m-1 flex w-64 cursor-pointer items-center gap-5 rounded-xl px-2 py-2 active:scale-95",
        className,
        value !== selectedValue && selectedStyle === "text" && "text-gray-300",
        value === selectedValue
          ? selectedStyle === "background"
            ? "bg-slate-100"
            : "text-black"
          : "",
      )}
      {...props}
    >
      {icon && <img src={icon} className={`h-${iconSize} m-2`} alt="" />}
      <span className="text-md">{text}</span>
    </div>
  );
};

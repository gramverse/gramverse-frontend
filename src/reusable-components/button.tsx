import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const sizes: Record<Sizes, string> = {
  small: "h-7 px-2 py-2 gap-2 rounded-xl text-sm ",
  medium: "h-9 px-4 py-2 gap-3 rounded-2xl text-md",
  large: "h-12 px-5 py-3 gap-4 rounded-3xl text-lg ",
};
const btnColors: Record<BtnColors, string> = {
  secondary:
    "bg-submit-btn text-white border-none shadow-[-2px_2px_3px_3px_rgba(0,0,0,0.1)] ",
  transparent: "bg-transparent text-black border-none",
  outline:
    "bg-transparent text-submit-btn border-solid border-2 border-red-600",
};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  btnColor?: BtnColors;
  classes?: string | undefined;
}

type Sizes = "small" | "medium" | "large";
type BtnColors = "secondary" | "transparent" | "outline";
export const Button = (props: ButtonProps) => {
  const {
    size = "medium",
    btnColor = "secondary",
    classes = "",
    type,
    children,
    onClick,
    ...attrs
  } = props;
  return (
    <button
      type={type}
      className={clsx(
        `w-fit cursor-pointer hover:brightness-90 active:scale-90`,
        sizes[size],
        btnColors[btnColor],
        classes,
      )}
      onClick={(e) => {
        onClick?.(e);
      }}
      {...attrs}
    >
      {children}
    </button>
  );
};

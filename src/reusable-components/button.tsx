import { ReactNode } from "react";

const sizes: Record<Sizes, string> = {
  small: "h-7 px-2 py-2 gap-2 rounded-xl text-sm ",
  medium: "h-9 px-4 py-2 gap-3 rounded-2xl text-md",
  large: "h-12 px-5 py-3 gap-4 rounded-3xl text-lg ",
};
const btnColors: Record<BtnColors, string> = {
  secondary: "bg-submit-btn",
  transparent: "bg-transparent text-black",
};
interface ButtonProps {
  size?: "small" | "medium" | "large";
  btnColor?: "secondary" | "transparent";
  classes?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

type Sizes = "small" | "medium" | "large";
type BtnColors = "secondary" | "transparent";
export const Button = (props: ButtonProps) => {
  const {
    size = "medium",
    btnColor = "secondary",
    classes = "",
    type = "button",
    children,
    onClick,
  } = props;
  return (
    <button
      type={type}
      className={`border-none w-fit ${sizes[size]} ${btnColors[btnColor]} ${classes}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

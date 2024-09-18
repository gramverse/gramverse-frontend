import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const sizes: Record<Sizes, string> = {
  small: "h-7 px-2 py-2 gap-2 rounded-xl text-sm ",
  medium: "h-9 px-4 py-2 gap-3 rounded-2xl text-md",
  large: "h-12 px-5 py-3 gap-4 rounded-3xl text-lg ",
};
const btnStyles: Record<BtnStyles, string> = {
  secondary:
    "bg-submit-btn text-white border-none shadow-[-2px_2px_3px_3px_rgba(0,0,0,0.1)] ",
  transparent: "bg-transparent text-black border-none",
  outline:
    "bg-transparent text-submit-btn border-solid border-2 border-red-600",
  disabled: "bg-neutral-400 border-none pointer-events-none text-white",
};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  btnColor?: BtnStyles;
  classes?: string | undefined;
  isPending?: boolean;
}

type Sizes = "small" | "medium" | "large";
export type BtnStyles = "secondary" | "transparent" | "outline" | "disabled";
export const Button = (props: ButtonProps) => {
  const {
    size = "medium",
    btnColor = "secondary",
    isPending = false,
    classes = "",
    type,
    children,
    onClick,
    className,
    ...attrs
  } = props;
  return (
    <button
      type={type}
      className={clsx(
        `flex w-fit cursor-pointer items-center justify-center text-center hover:brightness-90 active:scale-90`,
        sizes[size],
        btnStyles[btnColor],
        classes,
        className,
      )}
      onClick={(e) => {
        if (isPending) {
          e.preventDefault();
        }
        onClick?.(e);
      }}
      {...attrs}
    >
      {isPending && (
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

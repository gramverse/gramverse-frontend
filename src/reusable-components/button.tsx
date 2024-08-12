import {
  getVariantStyles,
  mergeClasses,
  Variant,
} from "../common/get-variant-classes";
import { ButtonHTMLAttributes } from "react";

const variants: Variant = {
  base: {
    base: "border-none w-fit",
  },
  size: {
    small: "h-7 px-2 py-2 gap-2 rounded-xl text-sm ",
    medium: "h-9 px-4 py-2 gap-3 rounded-2xl text-md",
    large: "h-12 px-5 py-3 gap-4 rounded-3xl text-lg",
  },
  btnColor: {
    red: "bg-submit-btn",
  },
  default: {
    size: "medium",
    btnColor: "red",
  },
};

interface CustomProps {
  size?: "small" | "medium" | "large";
  btnColor?: "red";
}
interface buttonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    CustomProps {}

export const Button = ({
  size = variants.default.size as CustomProps["size"],
  btnColor = variants.default.btnColor as CustomProps["btnColor"],
  className,
  children,
  ...props
}: buttonProps) => {
  const customClasses = getVariantStyles({ size, btnColor }, variants);
  const classes = mergeClasses(customClasses, variants.base.base, className);
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

import { HTMLAttributes } from "react";
import CheckMark from "../assets/svg/check-mark.svg";
import Error from "../assets/svg/error.svg";

import {
  getVariantStyles,
  mergeClasses,
  Variant,
} from "../common/get-variant-classes";

const variants: Variant = {
  base: {
    base: "flex items-center gap-2 py-2 ps-1 w-fit px-5",
    success: "bg-[#C3F9C2]",
    error: "bg-red-300",
  },
  fieldSize: {
    small: "h-8 px-2  gap-2 rounded-xl text-sm",
    medium: " h-10 gap-3 rounded-2xl text-md ",
    large: " h-12 px-5  gap-4 rounded-3xl text-lg ",
  },
  default: {
    fieldSize: "medium",
  },
};
interface CustomProps {
  fieldSize?: "small" | "medium" | "large";
  status: "success" | "error";
  message: string;
}

interface AlertProps extends HTMLAttributes<HTMLDivElement>, CustomProps {}

export const Alert = ({
  fieldSize = variants.default.fieldSize as CustomProps["fieldSize"],
  status,
  message,
  ...props
}: AlertProps) => {
  const customClasses = getVariantStyles({ fieldSize }, variants);
  document.addEventListener("invalid", (e) => {
    e.preventDefault();
  });

  return (
    <div
      className={mergeClasses(
        props.className,
        customClasses,
        variants.base.base,
        status === "success" && variants.base.success,
        status === "error" && variants.base.error
      )}
      {...props}
    >
      <img
        src={status === "error" ? Error : status == "success" ? CheckMark : ""}
        className=" m-2 h-full"
        alt=""
      />
      <span> {message}</span>
    </div>
  );
};

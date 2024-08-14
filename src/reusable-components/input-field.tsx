import {
  getVariantStyles,
  mergeClasses,
  Variant,
} from "../common/get-variant-classes";
import { forwardRef, InputHTMLAttributes } from "react";
import Error from "../assets/svg/error.svg";

const variants: Variant = {
  base: {
    base: " bg-white flex items-center gap-2 py-2 ps-1 text-right justify-start outline-red-200 border-solid border-2 border-gray-300",
    error: "border-solid border-2 border-red-600	",
  },
  fieldSize: {
    small: "w-48 h-8 px-2  gap-2 rounded-xl ",
    medium: "w-full h-10 gap-3 rounded-2xl ",
    large: "w-96 h-12 px-5  gap-4 rounded-3xl ",
  },
  default: {
    fieldSize: "medium",
  },
};
interface CustomProps {
  fieldSize?: "small" | "medium" | "large";
}

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "error">,
    CustomProps {
  svg?: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      fieldSize = variants.default.fieldSize,
      svg = "",
      error = "",
      className,
      ...props
    },
    ref
  ) => {
    const customClasses = getVariantStyles({ fieldSize }, variants);

    return (
      <div>
        <div
          className={mergeClasses(
            className,
            customClasses,
            variants.base.base,
            !!error && variants.base.error
          )}
        >
          <img src={svg} className=" m-2 h-full" alt="" />
          <input
            type="text"
            className="border-none focus:border-none focus:outline-none"
            ref={ref}
            {...props}
          ></input>
        </div>
        {!!error && (
          <div className=" m-1 ps-2">
            <img src={Error} className=" m-2 h-full" alt="" />
            <span className="text-red-600 text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

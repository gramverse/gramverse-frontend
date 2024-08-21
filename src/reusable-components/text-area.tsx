import {
  getVariantStyles,
  mergeClasses,
  Variant,
} from "../common/get-variant-classes";
import { forwardRef, TextareaHTMLAttributes } from "react";
import Error from "../assets/svg/error.svg";

const variants: Variant = {
  base: {
    base: " bg-white flex items-center gap-2 py-2 ps-1 text-right justify-start outline-red-200 border-solid border-2 border-gray-300",
    error: "border-solid border-2 border-red-600	",
  },
  fieldSize: {
    small: "rounded-xl ",
    medium: "rounded-2xl ",
    large: "rounded-3xl ",
  },
  default: {
    fieldSize: "medium",
  },
};
interface CustomProps {
  fieldSize?: "small" | "medium" | "large";
}

interface InputFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "error">,
    CustomProps {
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, InputFieldProps>(
  (props, ref) => {
    const {
      fieldSize = variants.default.fieldSize,
      error = "",
      className,
      rows = 5,
      cols = 33,
      ...rest
    } = props;
    const customClasses = getVariantStyles({ fieldSize }, variants);

    return (
      <div>
        <div
          className={mergeClasses(
            className,
            customClasses,
            variants.base.base,
            !!error && variants.base.error,
          )}
        >
          <textarea
            className="resize-none border-none p-4 focus:border-none focus:outline-none"
            rows={rows}
            cols={cols}
            ref={ref}
            {...rest}
          ></textarea>
        </div>
        {!!error && (
          <div className="m-1 ps-2">
            <img src={Error} className="m-2 h-full" alt="" />
            <span className="text-xs text-red-600">{error}</span>
          </div>
        )}
      </div>
    );
  },
);

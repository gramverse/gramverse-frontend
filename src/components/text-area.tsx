import { forwardRef, TextareaHTMLAttributes } from "react";
import Error from "@asset/svg/error.svg";
import clsx from "clsx";

const fieldSizes = {
  small: "rounded-xl ",
  medium: "rounded-2xl ",
  large: "rounded-3xl ",
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
      fieldSize = "medium",
      error = "",
      className,
      rows = 5,
      cols = 33,
      ...rest
    } = props;
    return (
      <div className="w-fit">
        <div
          className={clsx(
            className,
            "flex items-center justify-start gap-2 border-2 border-solid border-gray-300 bg-white py-2 ps-1 text-right outline-red-200",
            fieldSizes[fieldSize],
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

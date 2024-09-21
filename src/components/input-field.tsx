import { forwardRef, InputHTMLAttributes } from "react";
import Error from "@asset/svg/error.svg";
import clsx from "clsx";

const fieldSizes: Record<Sizes, string> = {
  mobile: "w-56 h-5 px-1 gap-1 rounded-3xl",
  xsmall: "w-80 h-5 px-1 gap-1 rounded-3xl",
  small: "w-80 h-7 px-2  gap-2 rounded-2xl ",
  medium: "w-80 h-10 gap-4 rounded-full ",
  large: "w-96 h-10 px-5  gap-4 rounded-full ",
  long: "w-96 h-5 px-1 gap-1 rounded-3xl",
};
const status: Record<Status, string> = {
  error: "border-solid border-2 border-red-600	",
  normal: "",
};

const directions: Record<Directions, string> = {
  left: "text-left",
  right: "text-right",
};
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  svg?: string;
  svgLocation?: "start" | "end";
  error?: string;
  classes?: string;
  fieldsize?: Sizes;
  direction?: Directions;
  usesError?: boolean;
}
type Sizes = "xsmall" | "small" | "medium" | "large" | "mobile" | "long";
type Status = "error" | "normal";
type Directions = "left" | "right";
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const {
      fieldsize: fieldSize = "small",
      direction = "right",
      svg = "",
      svgLocation = "start",
      error = "",
      placeholder = "",
      type = "text",
      usesError = true,
      classes,
      defaultValue,
      onKeyDown,
      maxLength,
      ...rest
    } = props;
    return (
      <div className="flex w-fit flex-col items-center">
        <div
          className={clsx(
            "flex items-center justify-start gap-2 border-2 border-solid border-gray-300 bg-white px-1 py-2 text-right",
            classes,
            fieldSizes[fieldSize],
            error && status["error"],
          )}
        >
          {svg && svgLocation === "start" && (
            <img src={svg} className="m-1 h-7" alt="" />
          )}
          <input
            maxLength={maxLength}
            defaultValue={defaultValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
              onKeyDown?.(e);
            }}
            type={type}
            className={clsx(
              "grow border-none px-3 focus:border-none focus:outline-none",
              directions[direction],
            )}
            ref={ref}
            placeholder={placeholder}
            {...rest}
          />
          {svg && svgLocation === "end" && (
            <img src={svg} className="m-1 h-7" alt="" />
          )}
        </div>
        {usesError && (
          <div
            className={clsx(
              "h-5 w-full scale-0",
              !!error &&
                "mt-2 flex scale-100 items-center justify-start ps-2 transition-all",
            )}
          >
            <img src={Error} className="m-2 h-full" alt="" />
            <span className="w-fit grow text-start text-xs text-red-600">
              {error}
            </span>
          </div>
        )}
      </div>
    );
  },
);

import { forwardRef, InputHTMLAttributes } from "react";
import Error from "../assets/svg/error.svg";
import clsx from "clsx";

const fieldSizes: Record<Sizes, string> = {
  xsmall: "w-80 h-5 px-1 gap-1 rounded-3xl",
  small: "w-80 h-7 px-2  gap-2 rounded-2xl ",
  medium: "w-80 h-10 gap-3 rounded-2xl ",
  large: "w-96 h-10 px-5  gap-4 rounded-3xl ",
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
  error?: string;
  classes?: string;
  fieldsize?: Sizes;
  direction?: Directions;
}
type Sizes = "xsmall" | "small" | "medium" | "large";
type Status = "error" | "normal";
type Directions = "left" | "right";
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      fieldsize: fieldSize = "small",
      direction = "right",
      svg = "",
      error = "",
      placeholder = "",
      type = "text",
      classes,
      defaultValue,
      onKeyDown,
      ...rest
    } = props;
    const customClasses = `bg-white flex items-center gap-2 py-2 ps-1 text-right justify-start border-solid border-2 border-gray-300 ${classes} ${fieldSizes[fieldSize]}`;
    if (error) {
      customClasses.concat(` ${status["error"]}`);
    }
    return (
      <div className="flex w-fit flex-col items-center">
        <div className={customClasses}>
          {svg && <img src={svg} className="m-1 h-7" alt="" />}
          <input
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
          ></input>
        </div>
        <div
          className={clsx(
            "h-5 scale-0",
            !!error &&
              "mt-2 flex scale-100 items-center justify-start ps-2 transition-all",
          )}
        >
          <img src={Error} className="m-2 h-full" alt="" />
          <span className="w-fit grow text-start text-xs text-red-600">
            {error}
          </span>
        </div>
      </div>
    );
  },
);

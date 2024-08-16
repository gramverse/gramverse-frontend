import { forwardRef } from "react";
import Error from "../assets/svg/error.svg";

const fieldSizes: Record<Sizes, string> = {
  small: "w-48 h-8 px-2  gap-2 rounded-xl ",
  medium: "w-78 h-10 gap-3 rounded-2xl ",
  large: "w-96 h-10 px-5  gap-4 rounded-3xl ",
};
const status: Record<Status, string> = {
  error: "border-solid border-2 border-red-600	",
  normal: "",
};
interface InputFieldProps {
  svg?: string;
  error?: string;
  classes?: string;
  fieldsize?: Sizes;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  defaultValue?: string;
}
type Sizes = "small" | "medium" | "large";
type Status = "error" | "normal";
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      fieldsize: fieldSize = "medium",
      svg = "",
      error = "",
      placeholder = "",
      type = "text",
      classes,
      defaultValue,
    } = props;
    const customClasses = `bg-white flex items-center gap-2 py-2 ps-1 text-right justify-start border-solid border-2 border-gray-300 ${classes} ${fieldSizes[fieldSize]}`;
    if (error) {
      customClasses.concat(` ${status["error"]}`);
    }
    return (
      <div className="w-full">
        <div className={customClasses}>
          {svg && <img src={svg} className="m-2 h-full" alt="" />}
          <input
            defaultValue={defaultValue}
            type={type}
            className="border-none focus:border-none focus:outline-none"
            ref={ref}
            placeholder={placeholder}
            onChange={(e) => {
              e.preventDefault();
            }}
            {...props}
          ></input>
        </div>
        {!!error && (
          <div className="flex items-center ps-2">
            <img src={Error} className="m-2 h-full" alt="" />
            <span className="text-xs text-red-600">{error}</span>
          </div>
        )}
      </div>
    );
  },
);

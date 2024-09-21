import clsx from "clsx";
import { HTMLAttributes } from "react";

const states = {
  current:
    "flex h-5 w-5 items-center justify-center rounded-full border-solid border-black bg-white after:h-1 after:w-1 after:rounded-full after:bg-black after:content-['']",
  done: "flex h-5 w-5 items-center justify-center rounded-full border-solid border-black bg-black after:text-white after:m-auto",
  toBeDone:
    "flex h-5 w-5 items-center justify-center rounded-full border-solid border-black bg-white ",
};
interface ProgressIndicatorTypes extends HTMLAttributes<HTMLDivElement> {
  text: string;
  state: "current" | "done" | "toBeDone";
}
export const ProgressIndicator = ({
  text,
  state,
  className,
}: ProgressIndicatorTypes) => {
  return (
    <div lang="en" className={clsx("m-0 flex flex-col gap-2 p-0", className)}>
      {state !== "done" && <span className={clsx(states[state])} />}
      {state === "done" && (
        <svg
          width="27"
          height="27"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="20" height="20" rx="10" fill="#191919" />
          <path
            d="M9.55297 12.3867C9.41964 12.3867 9.29297 12.3334 9.19964 12.2401L7.31297 10.3534C7.11964 10.1601 7.11964 9.84007 7.31297 9.64673C7.5063 9.4534 7.8263 9.4534 8.01964 9.64673L9.55297 11.1801L12.9796 7.7534C13.173 7.56007 13.493 7.56007 13.6863 7.7534C13.8796 7.94673 13.8796 8.26673 13.6863 8.46006L9.9063 12.2401C9.81297 12.3334 9.6863 12.3867 9.55297 12.3867Z"
            fill="white"
          />
        </svg>
      )}
      <span className="text-xs text-black">{text}</span>
    </div>
  );
};

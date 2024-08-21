import clsx from "clsx";
import { HTMLAttributes } from "react";

const states = {
  current:
    "flex h-5 w-5 items-center justify-center rounded-full border-solid border-black bg-white after:h-1 after:w-1 after:rounded-full after:bg-black after:content-['']",
  done: "flex h-5 w-5 items-center justify-center rounded-full border-solid border-black bg-black after:text-white after:m-auto after:content-['✓']",
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
    <div className={clsx("m-0 flex flex-col gap-2 p-0", className)}>
      <span className={clsx(states[state])} />
      <span className="text-xs text-black">{text}</span>
    </div>
  );
};

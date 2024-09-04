import clsx from "clsx";
import { ProgressIndicator } from "./progress-indicator";

export const ProgressBar = ({ stage }: { stage: number }) => {
  return (
    <div className="m-0 flex flex-row-reverse items-center p-0">
      <ProgressIndicator
        text={"عکس"}
        state={stage === 1 ? "current" : "done"}
        className="z-10 -mr-1"
      />
      <span
        className={clsx(
          "border-1 mt-2 w-32 self-start border-solid",
          stage < 2 && "border-gray-300",
          stage >= 2 && "border-black",
        )}
      />
      <ProgressIndicator
        text={"متن"}
        state={stage === 1 ? "toBeDone" : stage === 2 ? "current" : "done"}
        className="z-10 -mr-1"
      />
      <span
        className={clsx(
          "border-1 mt-2 w-32 self-start border-solid",
          stage < 3 && "border-gray-300",
          stage === 3 && "border-black",
        )}
      />
      <ProgressIndicator
        text={"تنظیمات"}
        state={stage < 3 ? "toBeDone" : "current"}
        className="z-10 -ml-5"
      />
    </div>
  );
};

import clsx from "clsx";
import { HTMLAttributes } from "react";

export const ContainterWeb = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "modal flex h-fit w-[465px] items-center justify-center rounded-3xl bg-primary p-10",
        className,
      )}
    >
      {children}
    </div>
  );
};
export const ContainterMobile = ({
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex h-full w-[335px] grow flex-col items-center justify-between self-center bg-primary px-5">
      {children}
    </div>
  );
};

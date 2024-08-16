import clsx from "clsx";
import { HTMLAttributes } from "react";

export const ContainterWeb = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "flex h-fit w-[485px] items-center justify-center rounded-3xl bg-form-bg p-10",
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
    <div className="flex h-screen w-screen flex-col items-center justify-between bg-form-bg">
      {children}
    </div>
  );
};

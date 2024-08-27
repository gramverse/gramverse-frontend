import clsx from "clsx";
import { HTMLAttributes } from "react";

export const ContainterWeb = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "container-shadow flex h-fit w-fit items-center justify-center rounded-3xl bg-primary p-10",
        className,
      )}
    >
      {children}
    </div>
  );
};
export const ContainterMobile = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "flex h-full grow flex-col items-center justify-between self-center overflow-hidden bg-primary px-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

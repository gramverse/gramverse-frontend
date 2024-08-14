import { HTMLAttributes } from "react";

export const ContainterMobile = ({
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="h-screen w-screen bgColor p-10 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export const ContainterWeb = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="w-[485px] bgColor rounded-3xl h-fit flex justify-center items-center p-10">
      {children}
    </div>
  );
};

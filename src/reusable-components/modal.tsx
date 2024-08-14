import { ReactNode } from "react";

export const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute z-20 w-screen h-screen flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm">
      {children}
    </div>
  );
};

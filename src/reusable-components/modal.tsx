import { ReactNode, useEffect, useState } from "react";

const display = {
  hidden: "-z-20 w-0 h-0 opacity-0",
  visible:
    "absolute z-20 opacity-100 transition-opacity flex h-screen w-screen items-center justify-center backdrop-blur-sm backdrop-brightness-50 transition-all",
};

export const Modal = ({ children = null }: { children?: ReactNode }) => {
  const [visible, setVisibility] = useState<"hidden" | "visible">("hidden");
  useEffect(() => {
    setVisibility(children ? "visible" : "hidden");
  }, [children]);
  return <div className={display[visible]}>{children}</div>;
};

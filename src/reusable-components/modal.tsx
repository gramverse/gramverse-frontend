import { ReactNode, useEffect, useState } from "react";

const display = {
  hidden: "-z-20 w-0 h-0",
  visible:
    "absolute z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm backdrop-brightness-50",
};

export const Modal = ({ children = null }: { children?: ReactNode }) => {
  const [visible, setVisibility] = useState<"hidden" | "visible">("hidden");
  useEffect(() => {
    setVisibility(children ? "visible" : "hidden");
  }, [children]);
  return <div className={display[visible]}>{children}</div>;
};

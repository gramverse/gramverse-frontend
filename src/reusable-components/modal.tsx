import clsx from "clsx";
import { nanoid } from "nanoid";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const display = {
  hidden: "w-0 h-0 opacity-0 inset-0 absolute",
  visible:
    "absolute z-20 opacity-100 transition-opacity flex h-screen w-screen inset-0 items-center justify-center backdrop-blur-sm backdrop-brightness-50 transition-all",
};

export const Modal = ({ children = null }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const [visible, setVisibility] = useState<"hidden" | "visible">("hidden");
  useEffect(() => {
    setVisibility(children ? "visible" : "hidden");
  }, [children]);
  const [isOpen, setIsOpen] = useState(true);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <div
      className={display[visible]}
      key={nanoid()}
      onClick={() => {
        close();
        setTimeout(() => {
          navigate(-1);
        }, 450);
      }}
    >
      <div
        className={clsx(
          "container-shadow m-20 flex h-fit w-fit justify-center overflow-clip rounded-3xl",
          isOpen && "animate-openModal",
          !isOpen && "animate-closeModal h-0 w-0",
        )}
        onClick={(e) => {
          e.stopPropagation();
          if ((e.target as HTMLElement).id === "close-modal") {
            close();
          }
        }}
        id="dialog"
      >
        {children}
      </div>
    </div>
  );
};

export const ModalMobile = ({ children = null }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <div
      className={clsx(
        "absolute inset-0 z-20 flex h-screen w-screen flex-col items-center justify-end opacity-100 backdrop-blur-sm backdrop-brightness-50 transition-opacity",
      )}
      key={nanoid()}
      onClick={() => {
        close();
        setTimeout(() => {
          navigate(-1);
        }, 490);
      }}
    >
      <div
        className={clsx(
          "flex h-fit w-full flex-col",
          isOpen && "animate-openDrawer",
          !isOpen && "animate-closeDrawer",
        )}
        onClick={(e) => {
          e.stopPropagation();
          if ((e.target as HTMLElement).id === "close-modal") {
            close();
          }
        }}
        id="dialog"
      >
        {children}
      </div>
    </div>
  );
};

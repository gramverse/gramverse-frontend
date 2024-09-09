import clsx from "clsx";
import { ReactNode, useCallback, useEffect, useState } from "react";

export const Modal = ({
  children = null,
  isOpen,
  close,
}: {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
}) => {
  const [isRendered, render] = useState(false);
  const [element, setElement] = useState<ReactNode | null>(null);
  useEffect(() => {
    isOpen
      ? render(true)
      : setTimeout(() => {
          render(false);
        }, 490);
  }, [isOpen, isRendered]);
  const closeModal = useCallback(() => {
    close();
    setTimeout(() => {
      render(false);
    }, 490);
  }, [close]);
  useEffect(() => {
    if (isRendered) {
      setElement(
        <div
          className={
            "absolute inset-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm backdrop-brightness-50"
          }
          onClick={() => {
            closeModal();
          }}
        >
          <div
            className={clsx(
              "flex h-fit w-fit justify-center overflow-clip rounded-3xl bg-transparent",
              isOpen && "animate-openModal",
              !isOpen && "animate-closeModal h-0 w-0",
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}
            id="dialog"
          >
            {children}
          </div>
        </div>,
      );
    } else {
      setElement(null);
    }
  }, [isRendered, isOpen, children, close, closeModal]);
  return element;
};

export const ModalMobile = ({
  children = null,
  isOpen,
  close,
}: {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
}) => {
  const [isRendered, render] = useState(false);
  const [element, setElement] = useState<ReactNode | null>(null);
  useEffect(() => {
    isOpen
      ? render(true)
      : setTimeout(() => {
          render(false);
        }, 490);
  }, [isOpen, isRendered]);
  const closeModal = useCallback(() => {
    close();
    setTimeout(() => {
      render(false);
    }, 490);
  }, [close]);
  useEffect(() => {
    if (isRendered) {
      setElement(
        <div
          className={clsx(
            "absolute inset-0 z-20 flex h-screen w-screen flex-col items-center justify-end backdrop-blur-sm backdrop-brightness-50",
          )}
          onClick={() => {
            closeModal();
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
            }}
            id="dialog"
          >
            {children}
          </div>
        </div>,
      );
    } else {
      setElement(null);
    }
  }, [isRendered, isOpen, children, close, closeModal]);
  return element;
};

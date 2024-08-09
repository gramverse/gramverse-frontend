import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const CancelBtn = ({
  children,
  className,
  ...btnProps
}: ButtonProps) => {
  return (
    <Button
      className={clsx(
        "w-20 h-9 py-2 px-4 gap-2 border-none rounded-2xl",
        className
      )}
      variant="outlined"
      {...btnProps}
      sx={{
        color: "black",
      }}
    >
      {children}
    </Button>
  );
};

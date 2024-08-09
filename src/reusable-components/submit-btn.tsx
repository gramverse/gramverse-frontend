import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const SubmitBtn = ({ children, className, ...btnProps }: ButtonProps) => {
  return (
    <Button
      className={clsx("w-20 h-9 py-2 px-4 .gap-2 bg-submit-btn rounded-2xl", className)}
      variant="contained"
      type="submit"
      {...btnProps}
    >
      {children}
    </Button>
  );
};

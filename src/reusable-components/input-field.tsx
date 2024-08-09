import {
  TextField,
  InputAdornment,
  SvgIcon,
  styled,
  FormHelperText,
  TextFieldProps,
} from "@mui/material";
import { ErrorIcon } from "../assets/svg/error";
import { ElementType, forwardRef, ReactNode } from "react";

type InputFieldProps = Omit<TextFieldProps, "error"> & {
  error?: { message?: ReactNode };
  svg: ElementType;
};

const CustomHelperText = styled(FormHelperText)(() => ({
  display: "flex",
  justifyContent: "start",
  gap: "10px",
  width: "100%",
  textAlign: "right",
}));

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ svg, error, ...textFieldProps }, ref) => {
    return (
      <TextField
        ref={ref}
        helperText={
          !!error && (
            <CustomHelperText>
              <ErrorIcon />
              {error?.message}
            </CustomHelperText>
          )
        }
        error={!!error}
        size="small"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            backgroundColor: "white",
          },
        }}
        FormHelperTextProps={{
          component: "div",
        }}
        InputProps={{
          className: "h-10 ps-3",
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon component={svg}></SvgIcon>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
      ></TextField>
    );
  }
);

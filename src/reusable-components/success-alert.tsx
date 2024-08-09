import { Alert } from "@mui/material";
import { CheckMark } from "../assets/svg/checkMark";

export const SuccessAlert = ({ text }: { text: string }) => {
  return (
    <Alert
      className=" bg-[#C3F9C2] flex flex-row-reverse w-fit p-3 px-20 rounded-xl"
      icon={<CheckMark />}
      severity="success"
      sx={{ bgcolor: "background.paper" }}
    >
      <span className="bg-[#c3f9c2] m-0">{text}</span>
    </Alert>
  );
};

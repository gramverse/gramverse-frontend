import { Outlet } from "react-router-dom";
// import rahnema from "../assets/svg/rahnema.svg";
// import { Tabs, Tab, Box } from "@mui/material";
// import React from "react";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const AuthorizeComponent = ({ children }: { children: React.ReactElement }) => {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="ورود" {...a11yProps(0)} />
//           <Tab label="ثبت نام" {...a11yProps(1)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         {children}
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         {children}
//       </CustomTabPanel>
//     </Box>
//   );

//   // <div className="flex flex-col justify-center items-center">
//   //   <img src={rahnema} alt="" />
//   //   {children}
//   // </div>
// };

export const Authroize = () => {
  return (
    <>
      {/* <AuthorizeComponent> */}
      <Outlet></Outlet>
      {/* </AuthorizeComponent> */}
    </>
  );
};

export const AuthroizeMobile = () => {
  return (
    <>
      {/* <AuthorizeComponent> */}
      <Outlet></Outlet>
      {/* </AuthorizeComponent> */}
    </>
  );
};

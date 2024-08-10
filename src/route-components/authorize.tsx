import { Link, useNavigate } from "react-router-dom";
import rahnema from "../assets/svg/rahnema.svg";
import { Tabs, Tab, Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { Login } from "./login";
import { Signup } from "./sign-up";
import { urls } from "../common/routes";
import background from "../assets/svg/background.svg";
import arrow from "../assets/svg/arrow.svg";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AuthorizeComponent = ({ defaultValue }: { defaultValue: number }) => {
  const [value, setValue] = React.useState(defaultValue);
  const navigate = useNavigate();
  useEffect(() => {
    switch (value) {
      case 0:
        navigate(urls.main + urls.login);
        break;
      case 1:
        navigate(urls.main + urls.signup);
    }
  }, [value, navigate]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex bgColor flex-col items-center justify-center w-fit">
      <img src={rahnema} alt="" className="my-5" />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
          <Tabs
            className="w-fit mx-auto   "
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                color: "lightgrey",
              },
              "& .Mui-selected": {
                color: "grey!important",
              },
            }}
          >
            <Tab label="ورود" {...a11yProps(0)} />
            <Tab label="" icon={<Divider orientation="vertical" />} disabled />
            <Tab label="ثبت نام" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Login></Login>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Signup></Signup>
        </CustomTabPanel>
        <div className="flex flex-col gap-0 mb-6 mr-8">
          <div>
            <img src={arrow} className="inline ml-3" alt="" />
            <Button>
              <Link
                className="text-red-400 text-md no-underline"
                to={`/${urls.forgetPassword}`}
              >
                فراموشی رمز عبور
              </Link>
            </Button>
          </div>
          <div>
            <img src={arrow} className="inline ml-3" alt="" />
            <Button
              className="text-red-400 text-md"
              onClick={() => {
                setValue(2);
              }}
            >
              ثبت نام در کالج‌گرام
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export const Authroize = () => {
  return (
    <div
      className="w-full h-screen overflow-hidden bg-white flex justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        // backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[485px] bgColor overflow-hidden rounded-3xl h-fit flex justify-center items-center">
        <AuthorizeComponent defaultValue={0}></AuthorizeComponent>
      </div>
    </div>
  );
};

export const AuthroizeMobile = () => {
  return (
    <>
      <div className="h-screen bgColor overflow-hidden w-fit p-10 flex flex-col justify-center items-center">
        <AuthorizeComponent defaultValue={0}></AuthorizeComponent>
      </div>
    </>
  );
};

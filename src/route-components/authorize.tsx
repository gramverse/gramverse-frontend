import { Link, useNavigate } from "react-router-dom";
import rahnema from "../assets/svg/rahnema.svg";
import { useEffect, useState } from "react";
import { Login } from "./login";
import { Signup } from "./sign-up";
import { urls } from "../common/routes";
import arrow from "../assets/svg/arrow.svg";
import { CollegeBackground } from "../reusable-components/rahnema-background";
import {
  ContainterMobile,
  ContainterWeb,
} from "../reusable-components/container";
import { Tab } from "../reusable-components/tab";

const AuthorizeComponent = ({ defaultValue }: { defaultValue: number }) => {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();
  useEffect(() => {
    switch (value) {
      case 0:
        navigate(urls.login);
        break;
      case 1:
        navigate(urls.signup);
    }
  }, [value, navigate]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="bgColor h-[800px] grow items-center justify-center gap-5 px-10 text-center">
      <img src={rahnema} alt="" className="my-5" />
      <div className="my-5 flex grow justify-center gap-6">
        <Tab
          text="ورود"
          className="w-fit"
          value="0"
          selectedValue={`${value}`}
          selectedStyle="text"
          onClick={() => {
            handleChange(0);
          }}
        ></Tab>
        <div className="h-10 w-0.5 bg-gray-400" />

        <Tab
          text={"ثبت نام"}
          className="w-fit"
          value="1"
          selectedValue={`${value}`}
          selectedStyle="text"
          onClick={() => {
            handleChange(1);
          }}
        ></Tab>
      </div>
      <div className="flex grow flex-col items-start">
        <div>{value === 0 ? <Login></Login> : <Signup></Signup>}</div>
        {value == 0 && (
          <div className="mb-6 flex grow flex-col items-start gap-3">
            <div>
              <img src={arrow} className="ml-3 inline" alt="" />
              <Link
                className="text-md text-red-400 no-underline"
                to={urls.forgetPassword}
              >
                فراموشی رمز عبور
              </Link>
            </div>
            <div>
              <img src={arrow} className="ml-3 inline" alt="" />
              <span
                className="text-red-400"
                onClick={() => {
                  setValue(1);
                }}
              >
                ثبت نام در کالج‌گرام
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Authroize = () => {
  return (
    <CollegeBackground>
      <ContainterWeb>
        <AuthorizeComponent defaultValue={0}></AuthorizeComponent>
      </ContainterWeb>
    </CollegeBackground>
  );
};

export const AuthroizeMobile = () => {
  return (
    <ContainterMobile>
      <AuthorizeComponent defaultValue={0}></AuthorizeComponent>
    </ContainterMobile>
  );
};

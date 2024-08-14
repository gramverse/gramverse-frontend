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
    <div className="flex bgColor flex-col items-center justify-center w-fit gap-5">
      <img src={rahnema} alt="" className="my-5" />
      <div className="w-fit flex justify-center gap-6">
        <Tab
          text="ورود"
          onClick={() => {
            handleChange(0);
          }}
        ></Tab>
        <Tab
          text={"ثبت نام"}
          onClick={() => {
            handleChange(1);
          }}
        ></Tab>
      </div>
      <div>{value === 0 ? <Login></Login> : <Signup></Signup>}</div>
      <div className="flex flex-col gap-3 mb-6 w-full">
        <div>
          <img src={arrow} className="inline ml-3" alt="" />
          <Link
            className="text-red-400 text-md no-underline"
            to={urls.forgetPassword}
          >
            فراموشی رمز عبور
          </Link>
        </div>
        <div>
          <img src={arrow} className="inline ml-3" alt="" />
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

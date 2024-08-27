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
import { TwinTab } from "../reusable-components/twin-tabs";

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

  return (
    <div className="w-full grow items-center justify-center gap-5 bg-primary text-center">
      <img src={rahnema} alt="" className="my-5" />
      <div className="my-5 flex grow justify-center gap-6">
        <TwinTab
          tab1={{ text: "ورود", url: urls.login }}
          tab2={{ text: "ثبت نام", url: urls.signup }}
          tab={value}
          setTab={setValue}
        />
      </div>
      <div className="flex grow flex-col items-start">
        <div className="flex items-center self-center">
          {value === 0 ? <Login></Login> : <Signup></Signup>}
        </div>
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

export const Authroize = ({ defaultValue }: { defaultValue: number }) => {
  return (
    <CollegeBackground>
      <ContainterWeb>
        <AuthorizeComponent defaultValue={defaultValue}></AuthorizeComponent>
      </ContainterWeb>
    </CollegeBackground>
  );
};

export const AuthroizeMobile = ({ defaultValue }: { defaultValue: number }) => {
  return (
    <ContainterMobile>
      <AuthorizeComponent defaultValue={defaultValue}></AuthorizeComponent>
    </ContainterMobile>
  );
};

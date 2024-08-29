import { Link, Outlet, useLocation } from "react-router-dom";
import rahnema from "../assets/svg/rahnema.svg";
import { useEffect, useState } from "react";
import { urls } from "../common/routes";
import arrow from "../assets/svg/arrow.svg";
import {
  ContainterMobile,
  ContainterWeb,
} from "../reusable-components/container";
import { TwinTab } from "../reusable-components/twin-tabs";

const AuthorizeComponent = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    switch (true) {
      case location.pathname.includes("login"):
        setValue(0);
        break;
      case location.pathname.includes("signup"):
        setValue(1);
    }
  }, [location.pathname]);

  return (
    <div className="h-[800px] w-[300px] grow items-center justify-center gap-5 bg-primary text-center">
      <img src={rahnema} alt="" className="my-5" />
      <div className="my-5 flex grow justify-center gap-6">
        <TwinTab
          tab1={{ text: "ورود", url: urls.login }}
          tab2={{ text: "ثبت نام", url: urls.signup }}
          tab={value}
        />
      </div>
      <div className="flex grow flex-col items-start">
        <div className="flex items-center self-center">
          <Outlet />
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

export const Authroize = () => {
  return (
    <ContainterWeb className="px-20">
      <AuthorizeComponent></AuthorizeComponent>
    </ContainterWeb>
  );
};

export const AuthroizeMobile = () => {
  return (
    <ContainterMobile>
      <AuthorizeComponent></AuthorizeComponent>
    </ContainterMobile>
  );
};

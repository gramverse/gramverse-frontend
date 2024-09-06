import { Outlet } from "react-router-dom";
import { Alert } from "../../reusable-components/alert";
import { Button } from "../../reusable-components/button";
import { useEffect, useState } from "react";

const ExploreMessageLayout = () => {
  const [login, setLogin] = useState(true);
  useEffect(() => {
    switch (localStorage.getItem("authorize")) {
      case "login":
        setLogin(true);
        break;
      case "signup":
        setLogin(false);
        break;
    }
  }, []);
  return (
    <>
      {login ? (
        <div className="flex w-fit flex-col items-center gap-10">
          <Alert
            message="با موفقیت وارد شدید"
            status="success"
            time={100000000000}
          />
        </div>
      ) : (
        <div className="m-7 flex flex-col items-center justify-between gap-9 rounded-xl border border-solid border-stone-300 bg-primary px-2 py-16">
          <h1 className="text-center text-4xl font-bold">
            سلام به کالج‌گرام خوش اومدی!
          </h1>
          <p className="text-l font-normal">
            برای دیدن عکس‌ها توی این صفحه باید
            <br /> کالج‌گرامی‌ها رو دنبال کنی. آماده‌ای؟
          </p>
          <Button>جستجوی کالج گرامی ها</Button>
        </div>
      )}
      <Outlet />
    </>
  );
};

export const ExploreMessage = () => {
  return (
    <>
      <ExploreMessageLayout />
    </>
  );
};

export const ExploreMessageMobile = () => {
  return (
    <>
      <ExploreMessageLayout />
    </>
  );
};

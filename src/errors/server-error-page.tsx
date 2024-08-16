import drippingMobile from "../assets/svg/m-error-top.svg";
import cloudsMobile from "../assets/svg/m-error-bottom.svg";
import drippingWeb from "../assets/svg/w-error-top.svg";
import cloudsWeb1 from "../assets/svg/w-error-bottom1.svg";
import cloudsWeb2 from "../assets/svg/w-error-bottom2.svg";
import { urls } from "../common/routes";
import "../assets/styles/App.css";
import { Link } from "react-router-dom";
import { Button } from "../reusable-components/button";

const ErrorMessage = ({ size }: { size: "mobile" | "web" }) => {
  return (
    <>
      {size === "mobile" && (
        <div className="m-7 flex flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 bg-[#f5f5f5] px-2 py-16">
          <h1 className="text-4xl font-bold">وای اینجا چه خبره؟!</h1>
          <h3 className="text-2xl font-bold">ظاهرا یک مشکلی وجود داره! </h3>
          <p className="text-l font-normal">
            ما داریم تلاش می‌کنیم که برطرفش کنیم. <br></br>لطفا چند دقیقه دیگه
            دوباره تلاش کن.
          </p>
          <Link
            className="w-fit rounded-3xl bg-[#ea5a69] px-7 py-3 text-base font-normal text-stone-50"
            to={urls.main}
          >
            {" "}
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
      {size === "web" && (
        <div className="m-7 flex flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 bg-[#f5f5f5] p-10">
          <h1 className="text-5xl font-bold">وای اینجا چه خبره؟!</h1>
          <h3 className="text-2xl font-bold">ظاهرا یک مشکلی وجود داره! </h3>
          <p className="text-l font-normal">
            ما داریم تلاش می‌کنیم که برطرفش کنیم. <br></br>لطفا چند دقیقه دیگه
            دوباره تلاش کن.
          </p>
          <Button>
            <Link
              className="text-base text-stone-50 no-underline"
              to={urls.main}
            >
              {" "}
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export const ServerErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <img src={drippingWeb} className="w-screen" alt="" />
      <ErrorMessage size={"web"}></ErrorMessage>
      <div className="mb-20 flex w-screen justify-evenly">
        <img src={cloudsWeb1} alt="" />
        <img src={cloudsWeb2} alt="" />
      </div>
    </div>
  );
};

export const ServerErrorPageMoblie = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <img src={drippingMobile} className="w-screen" alt="" />
      <ErrorMessage size={"mobile"}></ErrorMessage>
      <div className="mb-20 flex w-screen justify-evenly">
        <img src={cloudsMobile} className="w-screen" alt="" />
      </div>
    </div>
  );
};

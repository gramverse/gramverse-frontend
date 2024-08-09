import drippingMobile from "../assets/svg/m-error-top.svg";
import cloudsMobile from "../assets/svg/m-error-bottom.svg";
import drippingWeb from "../assets/svg/w-error-top.svg";
import cloudsWeb1 from "../assets/svg/w-error-bottom1.svg";
import cloudsWeb2 from "../assets/svg/w-error-bottom2.svg";
import { urls } from "../common/routes";
import "../assets/styles/App.css";
import { Link } from "react-router-dom";

const ErrorMessage = ({ size }: { size: "mobile" | "web" }) => {
  return (
    <>
      {size === "mobile" && (
        <div className="flex bg-[#f5f5f5] flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 m-7 py-16 px-2">
          <h1 className="font-bold text-4xl">وای اینجا چه خبره؟!</h1>
          <h3 className="font-bold text-2xl">ظاهرا یک مشکلی وجود داره! </h3>
          <p className="font-normal text-l">
            ما داریم تلاش می‌کنیم که برطرفش کنیم. <br></br>لطفا چند دقیقه دیگه
            دوباره تلاش کن.
          </p>
          <Link
            className="bg-[#ea5a69] text-base text-stone-50 rounded-3xl px-7 py-3 font-normal w-fit"
            to={urls.main}
          >
            {" "}
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
      {size === "web" && (
        <div className="flex flex-col  bg-[#f5f5f5] items-center justify-between gap-9 rounded-xl border border-stone-300 m-7 p-10">
          <h1 className="font-bold text-5xl">وای اینجا چه خبره؟!</h1>
          <h3 className="font-bold text-2xl">ظاهرا یک مشکلی وجود داره! </h3>
          <p className="font-normal text-l">
            ما داریم تلاش می‌کنیم که برطرفش کنیم. <br></br>لطفا چند دقیقه دیگه
            دوباره تلاش کن.
          </p>
          <Link
            className="bg-[#ea5a69] text-base text-stone-50 rounded-3xl px-7 py-3 font-normal w-fit"
            to={urls.main}
          >
            {" "}
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
    </>
  );
};

export const ServerErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <img src={drippingWeb} className="w-screen" alt="" />
      <ErrorMessage size={"web"}></ErrorMessage>
      <div className="flex justify-evenly w-screen mb-20">
        <img src={cloudsWeb1} alt="" />
        <img src={cloudsWeb2} alt="" />
      </div>
    </div>
  );
};

export const ServerErrorPageMoblie = () => {
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <img src={drippingMobile} className="w-screen" alt="" />
      <ErrorMessage size={"mobile"}></ErrorMessage>
      <div className="flex justify-evenly w-screen mb-20">
        <img src={cloudsMobile} className="w-screen" alt="" />
      </div>
    </div>
  );
};

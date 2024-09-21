import drippingMobile from "@asset/svg/m-error-top.svg";
import cloudsMobile from "@asset/svg/m-error-bottom.svg";
import drippingWeb from "@asset/svg/w-error-top.svg";
import cloudsWeb1 from "@asset/svg/w-error-bottom1.svg";
import cloudsWeb2 from "@asset/svg/w-error-bottom2.svg";
import { Link } from "react-router-dom";

const ErrorMessage = ({ size }: { size: "mobile" | "web" }) => {
  return (
    <>
      {size === "mobile" && (
        <div className="m-7 flex flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 bg-[#f5f5f5] px-2 py-16">
          <h1 className="text-4xl font-bold">آدرس مورد نظر وجود ندارد</h1>
          <Link
            className="w-fit rounded-3xl bg-[#ea5a69] px-7 py-3 text-base font-normal text-stone-50"
            to={"/"}
          >
            {" "}
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
      {size === "web" && (
        <div className="m-7 flex flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 bg-[#f5f5f5] p-10">
          <h1 className="text-5xl font-bold">آدرس مورد نظر وجود ندارد</h1>
          <Link
            className="w-fit rounded-3xl bg-[#ea5a69] px-7 py-3 text-base font-normal text-stone-50"
            to={"/"}
          >
            {" "}
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
    </>
  );
};

export const UrlErrorPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <img src={drippingWeb} className="w-full" alt="" />
      <ErrorMessage size={"web"}></ErrorMessage>
      <div className="mb-20 flex justify-evenly">
        <img src={cloudsWeb1} alt="" />
        <img src={cloudsWeb2} alt="" />
      </div>
    </div>
  );
};

export const UrlErrorPageMobile = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <img src={drippingMobile} className="w-full" alt="" />
      <ErrorMessage size={"mobile"}></ErrorMessage>
      <div className="mb-20 flex w-full justify-evenly">
        <img src={cloudsMobile} className="w-full" alt="" />
      </div>
    </div>
  );
};

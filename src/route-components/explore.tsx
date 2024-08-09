import { CircularProgress } from "@mui/material";
import { SuccessAlert } from "../reusable-components/success-alert";
import { SubmitBtn } from "../reusable-components/submit-btn";

const ExploreMessage = ({ login }: { login: boolean }) => {
  return (
    <>
      {login ? (
        <div className="flex flex-col gap-10 items-center w-full">
          <CircularProgress />
          <SuccessAlert text="با موفقیت وارد شدید" />
        </div>
      ) : (
        <div className="flex bg-[#f5f5f5] flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 m-7 py-16 px-2">
          <h1 className="font-bold text-4xl text-center">
            سلام به کالج‌گرام خوش اومدی!
          </h1>
          <p className="font-normal text-l">
            برای دیدن عکس‌ها توی این صفحه باید
            <br /> کالج‌گرامی‌ها رو دنبال کنی. آماده‌ای؟
          </p>
          <SubmitBtn>جستجوی کالج گرامی ها</SubmitBtn>
        </div>
      )}
    </>
  );
};

export const Explore = ({ login }: { login: boolean }) => {
  return (
    <>
      <ExploreMessage login={login} />
    </>
  );
};

export const ExploreMobile = ({ login }: { login: boolean }) => {
  return (
    <>
      <ExploreMessage login={login} />
    </>
  );
};

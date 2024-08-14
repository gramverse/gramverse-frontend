import { Alert } from "../reusable-components/alert";
import { Button } from "../reusable-components/button";

const ExploreMessage = ({ login }: { login: boolean }) => {
  return (
    <>
      {login ? (
        <div className="flex flex-col gap-10 items-center w-full">
          {/* <CircularProgress /> */}
          <Alert message="با موفقیت وارد شدید" status="success" />
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
          <Button>جستجوی کالج گرامی ها</Button>
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

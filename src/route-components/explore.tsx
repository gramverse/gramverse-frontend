import { Alert } from "../reusable-components/alert";
import { Button } from "../reusable-components/button";

const ExploreMessage = ({ login }: { login: boolean }) => {
  return (
    <>
      {login ? (
        <div className="flex w-full flex-col items-center gap-10">
          {/* <CircularProgress /> */}
          <Alert message="با موفقیت وارد شدید" status="success" />
        </div>
      ) : (
        <div className="m-7 flex flex-col items-center justify-between gap-9 rounded-xl border border-stone-300 bg-form-bg px-2 py-16">
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

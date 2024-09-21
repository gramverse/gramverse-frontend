import rahnemaLogo from "@asset/svg/rahnema-logo.svg";

export const ForgetPasswordInfo = () => {
  return (
    <div className="flex w-96 flex-col items-center gap-8 rounded-3xl border-solid border-form-border bg-primary p-8">
      <img src={rahnemaLogo} className="h-16 w-24" alt="" />
      <p className="text-center leading-loose">
        لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً ایمیل‌تون رو چک
        کنید.
      </p>
    </div>
  );
};

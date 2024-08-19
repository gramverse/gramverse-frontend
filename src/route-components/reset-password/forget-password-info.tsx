import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import background from "../../assets/svg/background.svg";

export const ForgetPasswordInfo = () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-primary"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="m-auto flex w-3/12 flex-col items-center gap-8 rounded-3xl border-solid border-form-border py-16">
        <div className="h-16 w-24">
          <img src={rahnemaLogo} alt="" />
        </div>
        <div className="h-5 w-80 gap-8 text-center">
          <p className="leading-5">
            لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً ایمیل‌تون رو
            چک کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

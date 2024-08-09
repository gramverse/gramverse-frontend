import rahnemaLogo from "../../assets/svg/rahnema-logo.svg";
import background from "../../assets/svg/background.svg";

export const ForgetPasswordInfo = () => {
  return (
    <div
      className="w-full h-screen bg-white flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex flex-col items-center w-3/12 m-auto rounded-3xl py-16 gap-8 border-solid border-form-border">
        <div className="w-24 h-16">
          <img src={rahnemaLogo} alt="" />
        </div>
        <div className="w-80 h-5 gap-8 text-center">
          <p className="leading-5">
            لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً ایمیل‌تون رو
            چک کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

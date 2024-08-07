import drippingMobile from "../assets/svg/m-errorTop.svg";
import cloudsMobile from "../assets/svg/m-errorBottom.svg";
import drippingWeb from "../assets/svg/w-errorTop.svg";
import cloudsWeb1 from "../assets/svg/w-errorBottom1.svg";
import cloudsWeb2 from "../assets/svg/w-errorBottom2.svg";
import { Link } from "react-router-dom";
import { urls } from "../common/routes";
import "../assets/styles/App.css";

export const ServerErrorPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img src={drippingWeb} style={{ width: "100vw" }} alt="" />
      <div className="errorMsg">
        <h1 style={{ fontWeight: "700", fontSize: "40px" }}>
          وای اینجا چه خبره؟!
        </h1>
        <div style={{ height: "142px" }}>
          <h3 style={{ fontWeight: "700", fontSize: "20px" }}>
            ظاهرا یک مشکلی وجود داره!{" "}
          </h3>
          <p
            style={{
              width: "320px",
              textAlign: "center",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            ما داریم تلاش می‌کنیم که برطرفش کنیم. <br></br>لطفا چند دقیقه دیگه
            دوباره تلاش کن.
          </p>
        </div>
        <Link className="linkClass" to={urls.main}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-evenly",
          marginBottom: "60px",
        }}
      >
        <img src={cloudsWeb1} alt="" />
        <img src={cloudsWeb2} alt="" />
      </div>
    </div>
  );
};

export const ServerErrorPageMoblie = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img src={drippingMobile} width="375px" alt="" />
      <div className="errorMsg">
        <h1 style={{ fontWeight: "700", fontSize: "40px" }}>
          وای اینجا چه خبره؟!
        </h1>
        <div style={{ height: "142px" }}>
          <h3 style={{ fontWeight: "700", fontSize: "20px" }}>
            ظاهرا یک مشکلی وجود داره!{" "}
          </h3>
          <p
            style={{
              width: "320px",
              textAlign: "center",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            ما داریم تلاش می‌کنیم که برطرفش کنیم. <br></br>لطفا چند دقیقه دیگه
            دوباره تلاش کن.
          </p>
        </div>
        <Link className="linkClass" to={urls.main}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-between",
          marginBottom: "60px",
        }}
      >
        <img src={cloudsMobile} alt="" />
      </div>
    </div>
  );
};

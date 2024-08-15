import { Routes, Route } from "react-router-dom";
import { Main, MainMobile } from "./route-components/main/main";
import { MyPage, MyPageMobile } from "./route-components/my-page/my-page";
import { Authroize, AuthroizeMobile } from "./route-components/authorize";
import { UrlErrorPage, UrlErrorPageMobile } from "./errors/url-error-page";
import {
  ServerErrorPage,
  ServerErrorPageMoblie,
} from "./errors/server-error-page";

import { urls } from "./common/routes";
import {
  ForgetPassword,
  ForgetPasswordMobile,
} from "./route-components/reset-password/forget-password";
import { ForgetPasswordInfo } from "./route-components/reset-password/forget-password-info";
import {
  ResetPassWord,
  ResetPassWordMobile,
} from "./route-components/reset-password/reset-password";
import { EditProfile } from "./route-components/edit-profile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={urls.signup} element={<Authroize></Authroize>} />
      <Route path={urls.login} element={<Authroize></Authroize>} />
      <Route path={urls.forgetPassword} element={<ForgetPassword />} />
      <Route
        path={`${urls.resetPassword}/:link`}
        element={<ResetPassWord></ResetPassWord>}
      ></Route>
      <Route
        path={urls.forgetPasswordInfo}
        element={<ForgetPasswordInfo />}
      ></Route>
      <Route path={urls.editProfile} element={<EditProfile/>}></Route> 
      <Route path={urls.main} element={<Main></Main>}></Route>
      <Route path="*" element={<UrlErrorPage></UrlErrorPage>} />
      <Route path={urls.notFound} element={<UrlErrorPage></UrlErrorPage>} />
      <Route
        path={urls.serverError}
        element={<ServerErrorPage></ServerErrorPage>}
      />
    </Routes>
  );
};

export const AppRoutesMobile = () => {
  return (
    <Routes>
      <Route path={urls.signup} element={<AuthroizeMobile></AuthroizeMobile>} />
      <Route path={urls.login} element={<AuthroizeMobile></AuthroizeMobile>} />

      <Route
        path={`${urls.resetPassword}/:link`}
        element={<ResetPassWordMobile></ResetPassWordMobile>}
      />

      <Route path={urls.forgetPassword} element={<ForgetPasswordMobile />} />
      <Route path={urls.forgetPasswordInfo} element={<ForgetPasswordInfo />} />
      <Route path={urls.main} element={<MainMobile></MainMobile>}></Route>
      <Route
        path="*"
        element={<UrlErrorPageMobile></UrlErrorPageMobile>}
      ></Route>
      <Route
        path={urls.notFound}
        element={<UrlErrorPageMobile></UrlErrorPageMobile>}
      />
      <Route
        path={urls.serverError}
        element={<ServerErrorPageMoblie></ServerErrorPageMoblie>}
      />
    </Routes>
  );
};

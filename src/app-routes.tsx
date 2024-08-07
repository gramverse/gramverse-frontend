import { Routes, Route } from "react-router-dom";
import { Signup, SignupMoblie } from "./route-components/signup";
import { Login, LoginMobile } from "./route-components/login";
import { Main, MainMobile } from "./route-components/main";
import { Explore, ExploreMobile } from "./route-components/explore";
import { MyPage, MyPageMobile } from "./route-components/myPage";
import { Authroize, AuthroizeMobile } from "./route-components/authorize";
import { UrlErrorPage, UrlErrorPageMobile } from "./errors/url-error-page";
import {
  ServerErrorPage,
  ServerErrorPageMoblie,
} from "./errors/server-error-page";

import { urls } from "./common/routes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={urls.authorize} element={<Authroize></Authroize>}>
        <Route path={urls.signup} element={<Signup></Signup>}></Route>
        <Route path={urls.login} element={<Login></Login>}></Route>
      </Route>
      <Route path={urls.main} element={<Main></Main>}>
        <Route path={urls.explore} element={<Explore></Explore>}></Route>
        <Route path={urls.myPage} element={<MyPage></MyPage>}></Route>
        <Route></Route>
      </Route>
      <Route path="*" element={<UrlErrorPage></UrlErrorPage>}></Route>
      <Route
        path={urls.serverError}
        element={<ServerErrorPage></ServerErrorPage>}
      ></Route>
    </Routes>
  );
};

export const AppRoutesMobile = () => {
  return (
    <Routes>
      <Route
        path={urls.authorize}
        element={<AuthroizeMobile></AuthroizeMobile>}
      >
        <Route
          path={urls.signup}
          element={<SignupMoblie></SignupMoblie>}
        ></Route>
        <Route path={urls.login} element={<LoginMobile></LoginMobile>}></Route>
      </Route>
      <Route path={urls.main} element={<MainMobile></MainMobile>}>
        <Route
          path={urls.explore}
          element={<ExploreMobile></ExploreMobile>}
        ></Route>
        <Route
          path={urls.myPage}
          element={<MyPageMobile></MyPageMobile>}
        ></Route>
        <Route></Route>
      </Route>
      <Route
        path="*"
        element={<UrlErrorPageMobile></UrlErrorPageMobile>}
      ></Route>
      <Route
        path="errorpage"
        element={<ServerErrorPageMoblie></ServerErrorPageMoblie>}
      ></Route>
    </Routes>
  );
};

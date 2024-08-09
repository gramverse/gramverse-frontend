import { Routes, Route } from "react-router-dom";
import { Main, MainMobile } from "./route-components/main";
import { Explore, ExploreMobile } from "./route-components/explore";
import { MyPage, MyPageMobile } from "./route-components/my-page";
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
      <Route path={urls.signup} element={<Authroize></Authroize>}></Route>
      <Route path={urls.login} element={<Authroize></Authroize>}></Route>
      <Route path={`${urls.main}:username`} element={<Main></Main>}>
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
        path={urls.signup}
        element={<AuthroizeMobile></AuthroizeMobile>}
      ></Route>
      <Route
        path={urls.login}
        element={<AuthroizeMobile></AuthroizeMobile>}
      ></Route>
      <Route path={`${urls.main}:username`} element={<MainMobile></MainMobile>}>
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
        path={urls.serverError}
        element={<ServerErrorPageMoblie></ServerErrorPageMoblie>}
      ></Route>
    </Routes>
  );
};

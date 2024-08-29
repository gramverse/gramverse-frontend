import { Routes, Route } from "react-router-dom";
import { Main, MainMobile } from "./route-components/main/main";
import { Authroize, AuthroizeMobile } from "./route-components/authorize";
import { UrlErrorPage, UrlErrorPageMobile } from "./errors/url-error-page";
import { ServerErrorPage, ServerErrorPageMoblie } from "./errors/server-error";

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
import { Explore, ExploreMobile } from "./route-components/explore";
import { EditPostMobile } from "./route-components/post/edit-post";
import { MyPage, MyPageMobile } from "./route-components/my-page/my-page";
import {
  UserPage,
  UserPageMobile,
} from "./route-components/user-page/user-page";
import {
  PostViewWeb,
  PostViewMobile,
} from "./route-components/post-view/my-post-view";
import { CreatePostMobile } from "./route-components/post/create-post";
import { CollegeBackground } from "./reusable-components/rahnema-background";
import { Signup, SignupMoblie } from "./route-components/sign-up";
import { Login, LoginMobile } from "./route-components/login";
import {
  CloseFriends,
  CloseFriendsMobile,
} from "./route-components/lists/close-friends";
import {
  BlackList,
  BlackListMobile,
} from "./route-components/lists/black-list";
import { List, ListMobile } from "./route-components/lists/list";
import {
  UserPostViewMobile,
  UserPostViewWeb,
} from "./route-components/post-view/user-post-view";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<CollegeBackground />}>
        <Route element={<Authroize />}>
          <Route path={urls.signup} element={<Login />} />
          <Route path={urls.login} element={<Signup />} />
        </Route>
        <Route path={urls.forgetPassword} element={<ForgetPassword />} />
        <Route
          path={`${urls.resetPassword}/:token`}
          element={<ResetPassWord></ResetPassWord>}
        />
        <Route
          path={urls.forgetPasswordInfo}
          element={<ForgetPasswordInfo />}
        />
      </Route>

      <Route path="/" element={<Main></Main>}>
        <Route element={<List />}>
          <Route path={"close-friends"} element={<CloseFriends />} />
          <Route path={"black-list"} element={<BlackList />} />
        </Route>
        <Route path={"user/:userName"} element={<UserPage />}>
          <Route path={`post-view/:postId`} element={<UserPostViewWeb />} />
        </Route>
        <Route path={"profile/:userName"} element={<MyPage />} />
        <Route
          path={`profile/:userName/post-view/:postId`}
          element={<PostViewWeb />}
        />

        <Route index element={<Explore />} />
      </Route>
      <Route path={urls.notFound} element={<UrlErrorPage></UrlErrorPage>} />
      <Route
        path={urls.serverError}
        element={<ServerErrorPage></ServerErrorPage>}
      />
      <Route path="*" element={<UrlErrorPage></UrlErrorPage>} />
    </Routes>
  );
};

export const AppRoutesMobile = () => {
  return (
    <Routes>
      <Route element={<AuthroizeMobile />}>
        <Route path={urls.signup} element={<LoginMobile />} />
        <Route path={urls.login} element={<SignupMoblie />} />
      </Route>

      <Route
        path={`${urls.resetPassword}/:token`}
        element={<ResetPassWordMobile></ResetPassWordMobile>}
      />

      <Route path={urls.forgetPassword} element={<ForgetPasswordMobile />} />
      <Route path={urls.forgetPasswordInfo} element={<ForgetPasswordInfo />} />
      <Route path={"/"} element={<MainMobile />}>
        <Route element={<ListMobile />}>
          <Route path={"close-friends"} element={<CloseFriendsMobile />} />
          <Route path={"black-list"} element={<BlackListMobile />} />
        </Route>
        <Route path="create-post" element={<CreatePostMobile />} />
        <Route
          path="profile/:userName/post/:postId/edit"
          element={<EditPostMobile />}
        />
        <Route path={"user/:userName"} element={<UserPageMobile />}>
          <Route path="post/:postId" element={<UserPostViewMobile />} />
        </Route>
        <Route path={"profile/:userName"} element={<MyPageMobile />}>
          <Route path="post/:postId" element={<PostViewMobile />} />
        </Route>
        <Route index element={<ExploreMobile />} />
      </Route>

      <Route
        path={urls.notFound}
        element={<UrlErrorPageMobile></UrlErrorPageMobile>}
      />
      <Route
        path={urls.serverError}
        element={<ServerErrorPageMoblie></ServerErrorPageMoblie>}
      />
      <Route
        path="*"
        element={<UrlErrorPageMobile></UrlErrorPageMobile>}
      ></Route>
    </Routes>
  );
};

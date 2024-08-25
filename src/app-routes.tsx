import { Routes, Route } from "react-router-dom";
import { Main, MainMobile } from "./route-components/main/main";
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
import { Explore, ExploreMobile } from "./route-components/explore";
import { CreatePost, CreatePostMobile } from "./route-components/post/post";
import { PostModal, PostViewMobile } from "./route-components/post-modal";
import { Modal } from "./reusable-components/modal";
import {
  EditProfile,
  EditProfileMoblie,
} from "./route-components/edit-profile";
import { MyPage, MyPageMobile } from "./route-components/my-page/my-page";
import {
  UserPage,
  UserPageMobile,
} from "./route-components/user-page/user-page";
import { DrawerMenu } from "./route-components/main/mobile-drawer-menu";
import {
  ViewPost,
  ViewPostMobile,
} from "./route-components/view-post/view-post";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={urls.signup} element={<Authroize></Authroize>} />
      <Route path={urls.login} element={<Authroize></Authroize>} />
      <Route path={urls.forgetPassword} element={<ForgetPassword />} />
      <Route
        path={`${urls.resetPassword}/:token`}
        element={<ResetPassWord></ResetPassWord>}
      ></Route>
      <Route
        path={urls.forgetPasswordInfo}
        element={<ForgetPasswordInfo />}
      ></Route>

      <Route path={"/"} element={<Main></Main>}>
        <Route
          path="create-post"
          element={
            <Modal>
              <CreatePost />
            </Modal>
          }
        />
        <Route path={"user/:userName"} element={<UserPage />}></Route>
        <Route path={"profile/:userName"} element={<MyPage />}>
          <Route
            path="edit-profile"
            element={
              <Modal>
                <EditProfile />/
              </Modal>
            }
          />

          <Route
            path="post/:id"
            element={
              <Modal>
                <PostModal />
              </Modal>
            }
          />
          <Route
            path="post/:id/edit"
            element={
              <Modal>
                <CreatePost />
              </Modal>
            }
          />
        </Route>
        <Route path={`view-post/:postId`} element={<ViewPost />}>
          <Route
            path="edit"
            element={
              <Modal>
                <CreatePost />
              </Modal>
            }
          />
        </Route>

        <Route index element={<Explore />} />
      </Route>
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
        path={`${urls.resetPassword}/:token`}
        element={<ResetPassWordMobile></ResetPassWordMobile>}
      />

      <Route path={urls.forgetPassword} element={<ForgetPasswordMobile />} />
      <Route path={urls.forgetPasswordInfo} element={<ForgetPasswordInfo />} />
      <Route path={"/"} element={<MainMobile />}>
        <Route path="create-post" element={<CreatePostMobile />} />
        <Route
          path="menu"
          element={
            <Modal>
              <DrawerMenu />
            </Modal>
          }
        />
        <Route path={"user/:userName"} element={<UserPageMobile />}>
          <Route path="post/:id" element={<PostViewMobile />} />
        </Route>
        <Route path={"profile/:userName"} element={<MyPageMobile />}>
          <Route
            path="edit-profile"
            element={
              <Modal>
                <EditProfileMoblie />
              </Modal>
            }
          />
          <Route path="post/:id/edit" element={<CreatePostMobile />} />
          <Route path="post/:id" element={<PostViewMobile />} />{" "}
        </Route>
        <Route index element={<ExploreMobile />} />
      </Route>
      <Route
        path={`${urls.viewPost}/:postId`}
        element={<ViewPostMobile />}
      ></Route>
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

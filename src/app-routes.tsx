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
import { PostModal } from "./route-components/post-view/post-modal";
import { Modal, ModalMobile } from "./reusable-components/modal";
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
  PostViewWeb,
  PostViewMobile,
} from "./route-components/post-view/my-post-view";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={urls.signup} element={<Authroize defaultValue={1} />} />
      <Route path={urls.login} element={<Authroize defaultValue={0} />} />
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
        <Route path={"user/:userName"} element={<UserPage />}>
          <Route
            path="post/:postId"
            element={
              <Modal>
                <PostModal />
              </Modal>
            }
          />
          <Route path={`post-view/:postId`} element={<PostViewWeb />} />
        </Route>
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
            path="create-post"
            element={
              <Modal>
                <CreatePost />
              </Modal>
            }
          />
          <Route
            path="post/:postId"
            element={
              <Modal>
                <PostModal />
              </Modal>
            }
          />
          <Route
            path="post/:postId/edit"
            element={
              <Modal>
                <CreatePost />
              </Modal>
            }
          />
        </Route>
        <Route
          path={`profile/:userName/post-view/:postId`}
          element={<PostViewWeb />}
        >
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
      <Route
        path={urls.signup}
        element={<AuthroizeMobile defaultValue={1} />}
      />
      <Route path={urls.login} element={<AuthroizeMobile defaultValue={0} />} />

      <Route
        path={`${urls.resetPassword}/:token`}
        element={<ResetPassWordMobile></ResetPassWordMobile>}
      />

      <Route path={urls.forgetPassword} element={<ForgetPasswordMobile />} />
      <Route path={urls.forgetPasswordInfo} element={<ForgetPasswordInfo />} />
      <Route path={"/"} element={<MainMobile />}>
        <Route
          path="create-post"
          element={
            <ModalMobile>
              <CreatePostMobile />
            </ModalMobile>
          }
        />
        <Route
          path="menu"
          element={
            <ModalMobile>
              <DrawerMenu />
            </ModalMobile>
          }
        />
        <Route path={"user/:userName"} element={<UserPageMobile />}>
          <Route path="post/:postId" element={<PostViewMobile />} />
        </Route>
        <Route path={"profile/:userName"} element={<MyPageMobile />}>
          <Route
            path="edit-profile"
            element={
              <ModalMobile>
                <EditProfileMoblie />
              </ModalMobile>
            }
          />
          <Route
            path="post/:postId/edit"
            element={
              <ModalMobile>
                <CreatePostMobile />
              </ModalMobile>
            }
          />
          <Route path="post/:postId" element={<PostViewMobile />} />
        </Route>
        <Route index element={<ExploreMobile />} />
      </Route>
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

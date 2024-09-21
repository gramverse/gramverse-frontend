import { Routes, Route } from "react-router-dom";
import { Main, MainMobile } from "../pages/main/main";
import {
  Authroize,
  AuthroizeMobile,
} from "../pages/authentication/authentication";
import {
  UrlErrorPage,
  UrlErrorPageMobile,
} from "../pages/error-pages/url-error-page";
import {
  ServerErrorPage,
  ServerErrorPageMoblie,
} from "../pages/error-pages/server-error";

import { urls } from "./routes";
import {
  ForgetPassword,
  ForgetPasswordMobile,
} from "../pages/reset-password/forget-password";
import { ForgetPasswordInfo } from "../pages/reset-password/forget-password-info";
import {
  ResetPassWord,
  ResetPassWordMobile,
} from "../pages/reset-password/reset-password";
import { Explore, ExploreMobile } from "../pages/explore/explore";
import { EditPostMobile } from "../pages/post/edit-post";
import { MyPage, MyPageMobile } from "../pages/my-page/my-page";
import { UserPage, UserPageMobile } from "../pages/user-page/user-page";
import { PostViewWeb, PostViewMobile } from "../pages/post-view/my-post-view";
import { CreatePostMobile } from "../pages/post/create-post";
import { CollegeBackground } from "../components/rahnema-background";
import { Signup, SignupMoblie } from "../pages/authentication/sign-up";
import { Login, LoginMobile } from "../pages/authentication/login";
import {
  CloseFriends,
  CloseFriendsMobile,
} from "../pages/user-lists/close-friends-list/close-friends";
import {
  BlackList,
  BlackListMobile,
} from "../pages/user-lists//black-list/black-list";
import { List, ListMobile } from "../pages/user-lists/twin-list";
import {
  UserPostViewMobile,
  UserPostViewWeb,
} from "../pages/post-view/user-post-view";
import { useGetProfile } from "../services/get-my-profile";
import { FollowerListMobile } from "../pages/followinger-list/follower-list";
import { FollowingListMobile } from "../pages/followinger-list/following-list";
import {
  Notification,
  NotificationMobile,
} from "../pages/notifications/notifications";
import {
  MyNotifications,
  MyNotificationsMobile,
} from "../pages/notifications/my-notifications/my-notifications";
import {
  FriendsNotification,
  FriendsNotificationMobile,
} from "../pages/notifications/friends-notifications/friends-notifications";
import { Search, SearchMobile } from "../pages/search/twin-search";
import {
  MentionPage,
  MentionPageMobile,
} from "../pages/mention-page/mention-page";
import {
  BookmarkPage,
  BookmarkPageMobile,
} from "../pages/bookmark-page/bookmark-page";
import { ChatList, ChatListMobile } from "../pages/chat/chat-list";

export const AppRoutes = () => {
  const { data } = useGetProfile();

  return (
    <Routes>
      <Route element={<CollegeBackground />}>
        <Route element={<Authroize />}>
          <Route path={urls.login} element={<Login />} />
          <Route path={urls.signup} element={<Signup />} />
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
        <Route path="/chat" element={<ChatList />} />
        <Route path={"/:userName"} element={<UserPage />} />
        <Route path={`/:userName/post/:postId`} element={<UserPostViewWeb />} />
        <Route element={<Notification />}>
          <Route path={"/my-notifications"} element={<MyNotifications />} />
          <Route
            path={"/friends-notifications"}
            element={<FriendsNotification />}
          />
        </Route>
        <Route path="/search" element={<Search />} />
        {data?.userName && (
          <Route path={`/${data?.userName}`} element={<MyPage />} />
        )}
        <Route
          path={`/${data?.userName}/post/:postId`}
          element={<PostViewWeb />}
        />

        <Route index element={<Explore />} />
        <Route path={urls.mentionPage} element={<MentionPage />} />
        <Route path={urls.bookmarkPage} element={<BookmarkPage />} />
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
  const { data } = useGetProfile();

  return (
    <Routes>
      <Route element={<AuthroizeMobile />}>
        <Route path={urls.login} element={<LoginMobile />} />
        <Route path={urls.signup} element={<SignupMoblie />} />
      </Route>

      <Route
        path={`${urls.resetPassword}/:token`}
        element={<ResetPassWordMobile></ResetPassWordMobile>}
      />

      <Route path={urls.forgetPassword} element={<ForgetPasswordMobile />} />
      <Route path={urls.forgetPasswordInfo} element={<ForgetPasswordInfo />} />
      <Route path={"/"} element={<MainMobile />}>
        <Route
          path={`/${data?.userName}/post/:postId`}
          element={<PostViewMobile />}
        />
        <Route
          path="/:userName/post/:postId"
          element={<UserPostViewMobile />}
        />
        <Route element={<ListMobile />}>
          <Route path={"close-friends"} element={<CloseFriendsMobile />} />
          <Route path={"black-list"} element={<BlackListMobile />} />
        </Route>
        <Route element={<NotificationMobile />}>
          <Route
            path={"/my-notifications"}
            element={<MyNotificationsMobile />}
          />
          <Route
            path={"/friends-notifications"}
            element={<FriendsNotificationMobile />}
          />
        </Route>
        <Route path="/search" element={<SearchMobile />} />
        <Route path="/chat" element={<ChatListMobile />} />
        {
          //add chatbox view mobile
        }
        <Route path={urls.mentionPage} element={<MentionPageMobile />} />
        <Route path={urls.bookmarkPage} element={<BookmarkPageMobile />} />
        <Route path="create-post" element={<CreatePostMobile />} />
        <Route
          path="/:userName/post/:postId/edit"
          element={<EditPostMobile />}
        />
        <Route path={"/:userName"} element={<UserPageMobile />} />
        <Route path={"/:userName/followers"} element={<FollowerListMobile />} />
        <Route
          path={"/:userName/followings"}
          element={<FollowingListMobile />}
        />

        {data?.userName && (
          <Route path={`/${data?.userName}`} element={<MyPageMobile />} />
        )}
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

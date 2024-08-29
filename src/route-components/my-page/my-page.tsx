import { Button } from "../../reusable-components/button";
import { EmptyGallery, EmptyGalleryMobile } from "./empty-gallery";
import { Gallery, GalleryMobile } from "./gallery";
import { useGetPosts, useGetProfile } from "../../api-hooks/my-page";
import { ViewAppUserInfo, ViewAppUserInfoMobile } from "../view-app-user-info";
import { Outlet, useNavigate } from "react-router-dom";

const MyPageLayout = () => {
  const {
    data: profileData,
    error: profileError,
    isError: isProfileError,
  } = useGetProfile();
  const { data: posts, isError: isPostError, error: postError } = useGetPosts();
  const thereIsNoPost = !posts || (posts && posts.length == 0);
  const navigate = useNavigate();
  if (isProfileError) {
    // user error handler
    console.log("just for build err", profileError);
  }
  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }
  return (
    <div className="flex grow flex-col gap-8 bg-primary">
      <p className="text-right text-xl font-extrabold leading-8">{"صفحه من"}</p>
      <div className="flex h-44 grow flex-col gap-3 border border-x-0 border-t-0 border-solid border-form-border">
        <div className="flex h-40 flex-row items-center gap-8">
          {profileData && <ViewAppUserInfo userInfo={profileData} />}
          {!profileData && (
            <>
              <div className="w-[133px]"></div>
              <div className="flex h-40 w-[377px] flex-col justify-start gap-4"></div>
            </>
          )}
          <div className="flex h-40 w-[377px] flex-col items-end justify-center">
            <Button
              classes="w-48"
              type="button"
              onClick={() => {
                navigate("edit-profile");
              }}
            >
              ویرایش پروفایل
            </Button>
          </div>
        </div>
      </div>
      <div>
        {thereIsNoPost && (
          <EmptyGallery userName={profileData?.userName ?? undefined} />
        )}
        {!thereIsNoPost && <Gallery posts={posts} />}
      </div>
      <Outlet />
    </div>
  );
};

export const MyPage = () => {
  return <MyPageLayout />;
};

export const MyPageMobile = () => {
  const {
    data: profileData,
    error: profileError,
    isError: isProfileError,
  } = useGetProfile();
  const { data: posts, isError: isPostError, error: postError } = useGetPosts();
  const thereIsNoPost = !posts || (posts && posts.length == 0);
  const navigate = useNavigate();
  if (isProfileError) {
    //use error handler
    console.log("just for build err", profileError);
  }
  if (isPostError) {
    //use error handler
    console.log("just for build err", postError);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-6 border border-x-0 border-t-0 border-solid border-form-border">
        {profileData && <ViewAppUserInfoMobile userInfo={profileData} />}
        {/* {!profileData && (
          <>
            <div className="w-[133px]"></div>
            <div className="flex h-40 w-[377px] flex-col justify-start gap-4"></div>
          </>
        )} */}
        <div className="flex flex-col items-center justify-center">
          <Button
            classes="w-48 my-2 "
            type="button"
            onClick={() => {
              navigate(`edit-profile`);
            }}
          >
            ویرایش پروفایل
          </Button>
        </div>
      </div>
      <div>
        {thereIsNoPost && <EmptyGalleryMobile />}
        {!thereIsNoPost && <GalleryMobile posts={posts} />}
      </div>
      <Outlet />
    </div>
  );
};

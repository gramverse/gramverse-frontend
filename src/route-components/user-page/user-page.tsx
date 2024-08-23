import { ViewAppUserInfo } from "../view-app-user-info";
import {
  useFollowUser,
  useGetUserPosts,
  useGetUserProfile,
} from "../../api-hooks/user-page";
import { NotAllowedViewGallery } from "./not-allowed-view-user-post";
import { UserEmptyGallery } from "./user-empty-gallery";
import { UserGallery } from "./user-gallery";
import { ContainterMobile } from "../../reusable-components/container";

 const UserPageLayout = ({ userName }: { userName: string }) => {
  const {
    data: userInfo,
    error: profileError,
    isError: isProfileError,
  } = useGetUserProfile(userName);

  const {
    data: userPosts,
    isError: isUserPostError,
    error: userPostError,
  } = useGetUserPosts(userInfo?.userName, userInfo?.isFollowed);

  const isEmptyGallery =
    userInfo?.isFollowed && userPosts && userPosts.length == 0;
  const isTherePost = userInfo?.isFollowed && userPosts && userPosts.length > 0;

  const {
    isError: isFollowError,
   error: followError,
    mutate: followMutate,
  } = useFollowUser();

  
  if (isProfileError) {
    //use error handler
    console.log("error", profileError);
  }
  if (isUserPostError) {
    //use error handler
    console.log("error", userPostError);
  }
  if (isFollowError) {
    //use error handler
    console.log("error",followError);
  }

  return (
    <div className="flex w-[952px] flex-col gap-3">
      <div className="flex h-[160px] w-[952px] flex-row items-center gap-8 border border-x-0 border-t-0 border-solid border-form-border pb-6">
        {userInfo && (
          <ViewAppUserInfo
            followMode
            userInfo={userInfo}
            isFollowed={userInfo.isFollowed}
            onFollowMethod={followMutate}
          />
        )}
        {/* 3noghte? */}
        <div className="flex h-40 w-[377px] flex-col items-end justify-center gap-[3px]">
          <div className="h-[8px] w-[8px] rounded-full bg-submit-btn"></div>
          <div className="h-[8px] w-[8px] rounded-full bg-submit-btn"></div>
          <div className="h-[8px] w-[8px] rounded-full bg-submit-btn"></div>
        </div>
      </div>

      <div>
        {userInfo && !userInfo.isFollowed && (
          <NotAllowedViewGallery
            userName={userInfo.userName}
            onFollowMethod={followMutate}
          />
        )}

        {userInfo && isEmptyGallery && (
          <UserEmptyGallery userName={userInfo.userName} />
        )}
        {userInfo && isTherePost && <UserGallery posts={userPosts} />}
      </div>
    </div>
  );
};

export const UserPage = ({ userName }: { userName: string }) => {
  return (
    <>
      <UserPageLayout userName={userName} />
    </>
    //   <ContainterWeb>
    //   <UserPageLayout userName={userName} />
    // </ContainterWeb>
  );
};

export const UserPageMobile = ({ userName }: { userName: string }) => {
  return (
    <>
      <ContainterMobile>
        <UserPageLayout userName={userName} />
      </ContainterMobile>
    </>
  );
};

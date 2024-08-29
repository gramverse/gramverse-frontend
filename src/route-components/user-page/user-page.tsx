import {
  useCancelRequest,
  useFollowUser,
  useGetUserPosts,
  useGetUserProfile,
} from "../../api-hooks/user-page";
import { PrivateGallery } from "./user-private-gallery";
import { UserEmptyGallery } from "./user-empty-gallery";
import { UserGallery } from "./user-gallery";
import { ContainterMobile } from "../../reusable-components/container";
import { useParams } from "react-router-dom";
import { UserAccountInfo } from "./user-account-info";
import { requestStatus } from "../../common/types/user-profile";
import { UserBlockedGallery } from "./user-blocked-gallery";
// import { Test } from "../test";

export const UserPageLayout = () => {
  const { userName } = useParams();
  const {
    data: userInfo,
    error: profileError,
    isError: isProfileError,
  } = useGetUserProfile(userName ?? "");

  const {
    data: userPosts,
    isError: isUserPostError,
    error: userPostError,
  } = useGetUserPosts(
    userInfo?.userName,
    (!userInfo?.hasBlockedUs &&
      userInfo?.followRequestState == requestStatus.accepted) ||
      !userInfo?.isPrivate,
  );

  const isFollowedUser =
    userInfo &&
    !userInfo.hasBlockedUs &&
    userInfo.followRequestState === requestStatus.accepted;
  const isPublicPage =
    userInfo && !userInfo.hasBlockedUs && !userInfo.isPrivate;
  const IsUserBlockedUs = userInfo && userInfo.hasBlockedUs;
  const isEmptyGallery =
    (isPublicPage || isFollowedUser) && userPosts && userPosts.length == 0;
  const isNoneEmptyGallery =
    (isPublicPage || isFollowedUser) && userPosts && userPosts.length > 0;
  const isStillPrivatePage =
    userInfo &&
    !userInfo.hasBlockedUs &&
    userInfo.isPrivate &&
    userInfo.followRequestState !== requestStatus.accepted;
  const {
    isError: isFollowError,
    error: followError,
    mutate: followMutate,
  } = useFollowUser();

  const {
    // isError: iscancelRequestError,
    // error: cancelRequestError,
    mutate: cancelRequestMutate,
  } = useCancelRequest();

  if (isProfileError) {
    //use error handler
    console.log("profile error", profileError);
  }
  if (isUserPostError) {
    //use error handler
    console.log("error", userPostError);
  }
  if (isFollowError) {
    //use error handler
    console.log("error", followError);
  }

  return (
    <div className="flex h-full w-[952px] flex-col gap-3 pt-36">
      <div className="flex h-40 w-[952px] flex-row items-center gap-8 border border-x-0 border-t-0 border-solid border-form-border pb-6">
        {userInfo && (
          <UserAccountInfo
            accountInfo={userInfo}
            onFollowMethod={followMutate}
            onCancelRequestMethod={cancelRequestMutate}
          />
        )}
        {/* 3noghte? */}
        <div className="flex h-40 w-[377px] flex-col items-end justify-center gap-[3px]">
          <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
          <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
          <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
        </div>
      </div>

      {/* { <Test />} */}
      {IsUserBlockedUs && <UserBlockedGallery userName={userInfo.userName} />}

      {isStillPrivatePage && (
        <PrivateGallery
          accountInfo={userInfo}
          onFollowMethod={followMutate}
          onCancelRequestMethod={cancelRequestMutate}
        />
      )}
      {isEmptyGallery && <UserEmptyGallery userName={userInfo.userName} />}
      {isNoneEmptyGallery && <UserGallery posts={userPosts} />}
    </div>
  );
};

export const UserPage = () => {
  return (
    <>
      <UserPageLayout />
    </>
  );
};

export const UserPageMobile = () => {
  return (
    <>
      <ContainterMobile>
        <UserPageLayout />
      </ContainterMobile>
    </>
  );
};

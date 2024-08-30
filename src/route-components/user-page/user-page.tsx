import {
  useCancelRequest,
  useFollowUser,
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
import { useState } from "react";
import { Modal } from "../../reusable-components/modal";
import { FollowerList } from "../followinger-list/follower-list";
import { FollowingList } from "../followinger-list/following-list";

export const UserPageLayout = () => {
  const { userName } = useParams();

  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);

  const {
    data: userProfile,
    error: profileError,
    isError: isProfileError,
  } = useGetUserProfile(userName ?? "");

  // const postLimit = 6;
  // const {
  //   data: postPages,
  //   isError: isUserPostError,
  //   error: userPostError,
  // } = useGetUserPosts(
  //   userProfile?.userName,
  //   (!userProfile?.hasBlockedUs &&
  //     userProfile?.followRequestState == requestStatus.accepted) ||
  //     !userProfile?.isPrivate,
  //   postLimit,
  // );

  //const userPosts = postPages?.pages.flatMap((x) => x.posts) ?? [];
  const isAllowedViewPosts =
    (!userProfile?.hasBlockedUs &&
      userProfile?.followRequestState == requestStatus.accepted) ||
    !userProfile?.isPrivate;
  const isFollowedUser =
    userProfile &&
    !userProfile.hasBlockedUs &&
    userProfile.followRequestState === requestStatus.accepted;
  const isPublicPage =
    userProfile && !userProfile.hasBlockedUs && !userProfile.isPrivate;
  const IsUserBlockedUs = userProfile && userProfile.hasBlockedUs;
  const isEmptyGallery =
    (isPublicPage || isFollowedUser) &&
    userProfile &&
    userProfile.postCount == 0;
  const isNoneEmptyGallery =
    (isPublicPage || isFollowedUser) &&
    userProfile &&
    userProfile.postCount > 0;
  const isStillPrivatePage =
    userProfile &&
    !userProfile.hasBlockedUs &&
    userProfile.isPrivate &&
    userProfile.followRequestState !== requestStatus.accepted;
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

  if (isFollowError) {
    //use error handler
    console.log("error", followError);
  }

  return (
    <div className="flex h-full w-[952px] flex-col gap-3 pt-36">
      {userProfile && (
        <Modal
          isOpen={isOpenFollowerList}
          close={() => {
            setOpenFollowerList(false);
          }}
        >
          <FollowerList
            userName={userProfile.userName}
            close={() => {
              setOpenFollowerList(false);
            }}
          />
        </Modal>
      )}
      {userProfile && (
        <Modal
          isOpen={isOpenFollowingList}
          close={() => {
            setOpenFollowingList(false);
          }}
        >
          <FollowingList
            userName={userProfile.userName}
            close={() => {
              setOpenFollowingList(false);
            }}
          />
        </Modal>
      )}
      <div className="flex h-40 w-[952px] flex-row items-center gap-8 border border-x-0 border-t-0 border-solid border-form-border pb-6">
        {userProfile && (
          <UserAccountInfo
            accountInfo={userProfile}
            onFollowMethod={followMutate}
            onCancelRequestMethod={cancelRequestMutate}
            onShowFollowingList={() => setOpenFollowingList(true)}
            onShowFollowerList={() => setOpenFollowerList(true)}
          />
        )}
        <div className="flex h-40 w-[377px] flex-col items-end justify-center gap-[3px]">
          <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
          <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
          <div className="h-2 w-2 rounded-full bg-submit-btn"></div>
        </div>
      </div>

      {IsUserBlockedUs && (
        <UserBlockedGallery userName={userProfile.userName} />
      )}

      {isStillPrivatePage && (
        <PrivateGallery
          accountInfo={userProfile}
          onFollowMethod={followMutate}
          onCancelRequestMethod={cancelRequestMutate}
        />
      )}
      {isEmptyGallery && <UserEmptyGallery userName={userProfile.userName} />}
      {isNoneEmptyGallery && (
        <UserGallery
          userName={userProfile.userName}
          isAllowedToViewPosts={isAllowedViewPosts}
        />
      )}
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

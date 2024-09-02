import { useFollowUser, useGetUserProfile } from "../../api-hooks/user-page";
import { PrivateGallery } from "./user-private-gallery";
import { UserEmptyGallery } from "./user-empty-gallery";
import { UserGallery } from "./user-gallery";
import { useParams } from "react-router-dom";
import { UserAccountInfo, UserAccountInfoMobile } from "./user-account-info";
import { requestStatus, UserProfile } from "../../common/types/user-profile";
import { UserBlockedGallery } from "./user-blocked-gallery";
import { useEffect, useState } from "react";
import { Modal } from "../../reusable-components/modal";
import { FollowerList } from "../followinger-list/follower-list";
import { FollowingList } from "../followinger-list/following-list";
import { Block } from "../user-relationship-modals/block-modal";
import { Close } from "../user-relationship-modals/close-modal";
import { Menu } from "./menu";
import { UserInfoSummary } from "../../common/types/user";
import more from "../../assets/svg/menu-dots.svg";
import { BtnStyles, Button } from "../../reusable-components/button";
type FollowStateType = {
  followBtnText: string;
  followBtnColor: BtnStyles;
  follow: boolean;
};

const useModals = () => {
  const [isFollowerListOpen, openFollowerList] = useState(false);
  const [isFollowingListOpen, openFollowingList] = useState(false);
  return {
    isFollowerListOpen,
    openFollowerList,
    isFollowingListOpen,
    openFollowingList,
  };
};
const useRelation = (userName: string | undefined) => {
  const {
    data: userProfile,
    error: profileError,
    isError: isProfileError,
  } = useGetUserProfile(userName ?? "");

  const [state, setState] = useState({
    isGalleryVisible: false,
    isUserFollowed: false,
    isPublic: false,
    hasUserBlockedUs: false,
    isGalleryHidden: false,
  });
  const [pendingState, setPendingState] = useState({
    isGalleryEmpty: false,
    isGalleryNotEmpty: false,
  });
  useEffect(() => {
    setState({
      isGalleryVisible:
        !userProfile?.hasBlockedUs &&
        (userProfile?.followRequestState == "accepted" ||
          !userProfile?.isPrivate),
      isUserFollowed:
        !userProfile?.hasBlockedUs &&
        userProfile?.followRequestState === "accepted",
      isPublic: !userProfile?.hasBlockedUs && !userProfile?.isPrivate,
      hasUserBlockedUs: !!userProfile?.hasBlockedUs,
      isGalleryHidden:
        !userProfile?.hasBlockedUs &&
        !!userProfile?.isPrivate &&
        userProfile?.followRequestState !== "accepted",
    });
  }, [userProfile]);
  useEffect(() => {
    setPendingState({
      isGalleryEmpty:
        (state.isPublic || state.isUserFollowed) &&
        userProfile !== undefined &&
        userProfile.postCount == 0,
      isGalleryNotEmpty:
        (state.isPublic || state.isUserFollowed) &&
        userProfile !== undefined &&
        userProfile.postCount > 0,
    });
  }, [state.isUserFollowed, state.isPublic, userProfile]);

  const {
    isError: isFollowError,
    error: followError,
    mutate: followMutate,
  } = useFollowUser();
  return {
    conditions: {
      ...state,
      ...pendingState,
    },

    isFollowError,
    followError,
    followMutate,
    userProfile,
    profileError,
    isProfileError,
  };
};
const useFollow = (accountInfo: UserProfile | undefined) => {
  const [state, setState] = useState<FollowStateType>({
    followBtnText: "دنبال کردن +",
    followBtnColor: "secondary",
    follow: true,
  });

  useEffect(() => {
    if (accountInfo) {
      setState({
        followBtnText: accountInfo.hasBlockedUs
          ? "+ دنبال کردن"
          : accountInfo.followRequestState == requestStatus.pending
            ? "لغو درخواست"
            : accountInfo.followRequestState == requestStatus.accepted
              ? "دنبال نکردن"
              : "+ دنبال کردن",
        followBtnColor: accountInfo.hasBlockedUs
          ? "disabled"
          : accountInfo.followRequestState == requestStatus.pending ||
              accountInfo.followRequestState == requestStatus.accepted
            ? "outline"
            : "secondary",
        follow:
          accountInfo.followRequestState == requestStatus.none ||
          accountInfo.followRequestState == requestStatus.unfollowed ||
          accountInfo.followRequestState == requestStatus.declined
            ? true
            : false,
      });
    }
  }, [accountInfo, accountInfo?.followRequestState, accountInfo?.hasBlockedUs]);

  return { ...state };
};
export const UserPageLayout = () => {
  const { userName } = useParams();
  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);

  const {
    data: userProfile,
    error: profileError,
    isError: isProfileError,
  } = useGetUserProfile(userName ?? "");

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

  if (isProfileError) {
    //use error handler
    console.log("profile error", profileError);
  }

  if (isFollowError) {
    //use error handler
    console.log("error", followError);
  }
  const [menu, openMenu] = useState(false);
  const selectedUser: UserInfoSummary = {
    userName: userProfile?.userName ?? "",
    profileImage: userProfile?.profileImage,
    followerCount: userProfile?.followerCount ?? 0,
  };
  const [modal, setModal] = useState<"block" | "close" | null>(null);
  return (
    <div
      className="flex h-full w-[952px] flex-col gap-3 pt-36"
      onClick={() => {
        openMenu(false);
      }}
    >
      <Modal
        isOpen={modal === "block"}
        close={() => {
          setModal(null);
        }}
      >
        <Block user={userProfile} close={() => setModal(null)} />
      </Modal>
      <Modal
        isOpen={modal === "close"}
        close={() => {
          setModal(null);
        }}
      >
        <Close
          user={selectedUser}
          close={() => {
            setModal(null);
          }}
        />
      </Modal>
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
      <div className="flex h-40 w-[952px] flex-row items-center justify-between gap-8 border border-x-0 border-t-0 border-solid border-form-border pb-6">
        {userProfile && (
          <UserAccountInfo
            accountInfo={userProfile}
            onFollowMethod={followMutate}
            onShowFollowingList={() => setOpenFollowingList(true)}
            onShowFollowerList={() => setOpenFollowerList(true)}
          />
        )}
        <div className="relative justify-self-end">
          <Menu
            isOpen={menu}
            canAddToCloseFriends={
              (isFollowedUser && !userProfile.isCloseFriend) ?? false
            }
            canBlock={!userProfile?.isBlocked}
            closeMenu={() => {
              openMenu(false);
            }}
            openModal={(arg: "block" | "close") => setModal(arg)}
          />

          <img
            src={more}
            alt=""
            className="me-5"
            onClick={(e) => {
              e.stopPropagation();
              openMenu(!menu);
            }}
          />
        </div>
      </div>

      {IsUserBlockedUs && (
        <UserBlockedGallery userName={userProfile.userName} />
      )}

      {isStillPrivatePage && (
        <PrivateGallery
          accountInfo={userProfile}
          onFollowMethod={followMutate}
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
  return <UserPageLayout />;
};

export const UserPageMobile = () => {
  const { userName } = useParams();
  const {
    isFollowerListOpen,
    isFollowingListOpen,
    openFollowerList,
    openFollowingList,
  } = useModals();

  const {
    userProfile,
    followMutate,
    conditions: {
      // IsUserBlockedUs,
      // isStillPrivatePage,
      // isEmptyGallery,
      // isNoneEmptyGallery,
      // isAllowedViewPosts,
      isUserFollowed: isFollowedUser,
    },
  } = useRelation(userName);
  const [menu, openMenu] = useState(false);
  const [modal, setModal] = useState<"block" | "close" | null>(null);

  const selectedUser: UserInfoSummary = {
    userName: userProfile?.userName ?? "",
    profileImage: userProfile?.profileImage,
    followerCount: userProfile?.followerCount ?? 0,
  };
  const { followBtnColor, followBtnText, follow } = useFollow(userProfile);

  return (
    <div
      className="flex h-full w-fit flex-col gap-3"
      onClick={() => {
        openMenu(false);
      }}
    >
      <Modal
        isOpen={modal === "block"}
        close={() => {
          setModal(null);
        }}
      >
        <Block user={userProfile} close={() => setModal(null)} />
      </Modal>
      <Modal
        isOpen={modal === "close"}
        close={() => {
          setModal(null);
        }}
      >
        <Close
          user={selectedUser}
          close={() => {
            setModal(null);
          }}
        />
      </Modal>
      <Modal
        isOpen={isFollowerListOpen && userProfile !== undefined}
        close={() => {
          openFollowerList(false);
        }}
      >
        <FollowerList
          userName={userProfile?.userName ?? ""}
          close={() => {
            openFollowerList(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isFollowingListOpen && userProfile !== undefined}
        close={() => {
          openFollowingList(false);
        }}
      >
        <FollowingList
          userName={userProfile?.userName ?? ""}
          close={() => {
            openFollowingList(false);
          }}
        />
      </Modal>

      <div className="flex flex-col gap-6 border border-x-0 border-t-0 border-solid border-form-border">
        <div className="flex w-full items-center">
          {userProfile && <UserAccountInfoMobile accountInfo={userProfile} />}
          <div className="relative justify-self-end">
            <Menu
              isOpen={menu}
              canAddToCloseFriends={
                (isFollowedUser && !userProfile?.isCloseFriend) ?? false
              }
              canBlock={!userProfile?.isBlocked}
              closeMenu={() => {
                openMenu(false);
              }}
              openModal={(arg: "block" | "close") => setModal(arg)}
            />

            <img
              src={more}
              alt=""
              className="me-5"
              onClick={(e) => {
                e.stopPropagation();
                openMenu(!menu);
              }}
            />
          </div>
        </div>
        <Button
          classes="my-2 w-full text-center justify-center"
          btnColor={followBtnColor}
          type="button"
          onClick={() => {
            followMutate({
              userName: userProfile?.userName ?? "",
              follow,
            });
          }}
        >
          {followBtnText}
        </Button>
      </div>
      {/* 
      {IsUserBlockedUs && (
        <UserBlockedGallery userName={userProfile?.userName ?? ""} />
      )}

      {userProfile && isStillPrivatePage && (
        <PrivateGallery
          accountInfo={userProfile}
          onFollowMethod={followMutate}
        />
      )}
      {isEmptyGallery && (
        <UserEmptyGallery userName={userProfile?.userName ?? ""} />
      )}
      {isNoneEmptyGallery && (
        <UserGallery
          userName={userProfile?.userName ?? ""}
          isAllowedToViewPosts={isAllowedViewPosts}
        />
      )} */}
    </div>
  );
};

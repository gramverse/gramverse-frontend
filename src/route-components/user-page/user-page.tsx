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
import { Block } from "../lists/block-modal";
import { Close } from "./close-modal";
import { Menu } from "./menu";
import { UserInfoSummary } from "../../common/types/user";
import more from "../../assets/svg/menu-dots.svg";
import { BtnStyles, Button } from "../../reusable-components/button";
type FollowStateType = {
  followBtnText: string;
  followBtnColor: BtnStyles;
  follow: boolean;
};

const useRelation = (userName: string | undefined) => {
  const {
    data: userProfile,
    error: profileError,
    isError: isProfileError,
  } = useGetUserProfile(userName ?? "");
  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);
  const [state, setState] = useState({
    isAllowedViewPosts: false,
    isFollowedUser: false,
    isPublicPage: false,
    IsUserBlockedUs: false,
    isStillPrivatePage: false,
  });
  const [pendingState, setPendingState] = useState({
    isEmptyGallery: false,
    isNoneEmptyGallery: false,
  });
  useEffect(() => {
    setState({
      isAllowedViewPosts:
        !userProfile?.hasBlockedUs &&
        (userProfile?.followRequestState == requestStatus.accepted ||
          !userProfile?.isPrivate),
      isFollowedUser:
        userProfile !== undefined &&
        !userProfile.hasBlockedUs &&
        userProfile.followRequestState === requestStatus.accepted,
      isPublicPage:
        userProfile !== undefined &&
        !userProfile.hasBlockedUs &&
        !userProfile.isPrivate,
      IsUserBlockedUs: userProfile !== undefined && userProfile.hasBlockedUs,

      isStillPrivatePage:
        userProfile !== undefined &&
        !userProfile.hasBlockedUs &&
        userProfile.isPrivate &&
        userProfile.followRequestState !== requestStatus.accepted,
    });
  }, [userProfile]);
  useEffect(() => {
    setPendingState({
      isEmptyGallery:
        (state.isPublicPage || state.isFollowedUser) &&
        userProfile !== undefined &&
        userProfile.postCount == 0,
      isNoneEmptyGallery:
        (state.isPublicPage || state.isFollowedUser) &&
        userProfile !== undefined &&
        userProfile.postCount > 0,
    });
  }, [state.isFollowedUser, state.isPublicPage, userProfile]);

  const {
    isError: isFollowError,
    error: followError,
    mutate: followMutate,
  } = useFollowUser();
  return {
    conditions: {
      ...state,
      ...pendingState,
      isOpenFollowerList,
      setOpenFollowerList,
      isOpenFollowingList,
      setOpenFollowingList,
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
    userProfile,
    followMutate,
    conditions: {
      isOpenFollowerList,
      setOpenFollowerList,
      isOpenFollowingList,
      setOpenFollowingList,
      // IsUserBlockedUs,
      // isStillPrivatePage,
      // isEmptyGallery,
      // isNoneEmptyGallery,
      // isAllowedViewPosts,
      isFollowedUser,
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
        isOpen={isOpenFollowerList && userProfile !== undefined}
        close={() => {
          setOpenFollowerList(false);
        }}
      >
        <FollowerList
          userName={userProfile?.userName ?? ""}
          close={() => {
            setOpenFollowerList(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isOpenFollowingList && userProfile !== undefined}
        close={() => {
          setOpenFollowingList(false);
        }}
      >
        <FollowingList
          userName={userProfile?.userName ?? ""}
          close={() => {
            setOpenFollowingList(false);
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

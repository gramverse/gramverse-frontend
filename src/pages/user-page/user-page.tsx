import { useFollowUser, useGetUserProfile } from "../../services/user-page";
import { PrivateGallery, PrivateGalleryMobile } from "./user-private-gallery";
import { UserEmptyGallery, UserEmptyGalleryMobile } from "./user-empty-gallery";
import { UserGallery, UserGalleryMobile } from "./user-gallery";
import { useParams } from "react-router-dom";
import { UserAccountInfo, UserAccountInfoMobile } from "./user-account-info";
import { UserBlockedGallery } from "./user-blocked-gallery";
import { useState } from "react";
import { Modal } from "../../components/modal";
import { FollowerList } from "../followinger-list/follower-list";
import { FollowingList } from "../followinger-list/following-list";
import { Block } from "../user-relationship-modals/block-modal";
import { Close } from "../user-relationship-modals/close-modal";
import { Menu } from "./menu";
import { UserInfoSummary } from "../../types/user";
import more from "../../assets/svg/menu-dots.svg";
import { BtnStyles, Button } from "../../components/button";
import { Unblock } from "../user-relationship-modals/unblock-modal";

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

export const UserPageLayout = () => {
  const { userName } = useParams();
  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);

  const {
    userProfile,
    isBlockedUs,
    isUserDataVisible,
    isFollowedUser,
    isEmptyGallery,
    isNoneEmptyGallery,
    isPrivatePage,
    followBtnText,
    followBtnColor,
  } = useGetUserProfile(userName ?? "");
  const { mutate: followMutate } = useFollowUser(userName ?? "");
  const [menu, openMenu] = useState(false);
  const selectedUser: UserInfoSummary = {
    userName: userProfile?.userName ?? "",
    profileImage: userProfile?.profileImage,
    followerCount: userProfile?.followerCount ?? 0,
  };
  const [modal, setModal] = useState<"block" | "close" | "unblock" | null>(
    null,
  );
  return (
    <div
      className="flex h-full w-[64rem] flex-col gap-3 pt-36"
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
        isOpen={modal === "unblock"}
        close={() => {
          setModal(null);
        }}
      >
        <Unblock user={userProfile} close={() => setModal(null)} />
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
      {userProfile && isUserDataVisible && (
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
      {userProfile && isUserDataVisible && (
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
      <div className="flex h-40 w-[64rem] flex-row items-center justify-between gap-8 border border-x-0 border-t-0 border-solid border-form-border pb-6">
        {userProfile && (
          <UserAccountInfo
            accountInfo={userProfile}
            onFollowMethod={followMutate}
            onShowFollowingList={() => setOpenFollowingList(true)}
            onShowFollowerList={() => setOpenFollowerList(true)}
            isUserDataVisible={isUserDataVisible ?? false}
            followBtnText={followBtnText ?? ""}
            followBtnColor={(followBtnColor as BtnStyles) ?? "transparent"}
          />
        )}
        <div className="relative justify-self-end">
          <Menu
            isOpen={menu}
            canAddToCloseFriends={
              (isFollowedUser && !userProfile?.isCloseFriend) ?? false
            }
            canBlock={!userProfile?.isBlocked}
            canUnblock={
              userProfile?.isBlocked !== undefined
                ? userProfile?.isBlocked
                : false
            }
            closeMenu={() => {
              openMenu(false);
            }}
            openModal={(arg: "block" | "close" | "unblock") => setModal(arg)}
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

      {isBlockedUs && (
        <UserBlockedGallery userName={userProfile?.userName ?? ""} />
      )}

      {userProfile && isPrivatePage && (
        <PrivateGallery
          accountInfo={userProfile}
          onFollowMethod={followMutate}
          followBtnText={followBtnText ?? ""}
          followBtnColor={(followBtnColor as BtnStyles) ?? "transparent"}
        />
      )}
      {userProfile && isEmptyGallery && (
        <UserEmptyGallery userName={userProfile.userName} />
      )}
      {userProfile && isNoneEmptyGallery && (
        <UserGallery
          userName={userProfile.userName}
          isAllowedToViewPosts={isUserDataVisible ?? false}
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
    isBlockedUs,
    isUserDataVisible,
    isFollowedUser,
    isEmptyGallery,
    isNoneEmptyGallery,
    isPrivatePage,
    followBtnText,
    followBtnColor,
  } = useGetUserProfile(userName ?? "");
  const { mutate: followMutate } = useFollowUser(userName ?? "");
  const [menu, openMenu] = useState(false);
  const [modal, setModal] = useState<"block" | "close" | "unblock" | null>(
    null,
  );

  const selectedUser: UserInfoSummary = {
    userName: userProfile?.userName ?? "",
    profileImage: userProfile?.profileImage,
    followerCount: userProfile?.followerCount ?? 0,
  };

  return (
    <div
      className="flex grow flex-col items-center justify-start gap-4"
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
        isOpen={modal === "unblock"}
        close={() => {
          setModal(null);
        }}
      >
        <Unblock user={userProfile} close={() => setModal(null)} />
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
          {userProfile && (
            <UserAccountInfoMobile
              accountInfo={userProfile}
              isUserDataVisible={isUserDataVisible ?? false}
            />
          )}
          <div className="relative justify-self-end">
            <Menu
              isOpen={menu}
              canUnblock={
                userProfile?.isBlocked !== undefined
                  ? userProfile?.isBlocked
                  : false
              }
              canAddToCloseFriends={
                (isFollowedUser &&
                  !userProfile?.isCloseFriend &&
                  !userProfile?.isBlocked) ??
                false
              }
              canBlock={!userProfile?.isBlocked}
              closeMenu={() => {
                openMenu(false);
              }}
              openModal={(arg: "block" | "close" | "unblock") => setModal(arg)}
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
          btnColor={(followBtnColor as BtnStyles) ?? "transparent"}
          disabled={userProfile?.hasBlockedUs || userProfile?.isBlocked}
          type="button"
          onClick={() => {
            followMutate();
          }}
        >
          {followBtnText}
        </Button>
      </div>

      <div>
        {isBlockedUs && (
          <UserBlockedGallery userName={userProfile?.userName ?? ""} />
        )}

        {userProfile && isPrivatePage && (
          <PrivateGalleryMobile
            accountInfo={userProfile}
            onFollowMethod={followMutate}
            followBtnText={followBtnText ?? ""}
            followBtnColor={(followBtnColor as BtnStyles) ?? "transparent"}
          />
        )}
        {isEmptyGallery && (
          <UserEmptyGalleryMobile userName={userProfile?.userName ?? ""} />
        )}
        {isNoneEmptyGallery && (
          <UserGalleryMobile
            userName={userProfile?.userName ?? ""}
            isAllowedToViewPosts={isUserDataVisible ?? false}
          />
        )}
      </div>
    </div>
  );
};

import { useFollowUser, useGetUserProfile } from "../../services/user-page";
import { PrivateGallery, PrivateGalleryMobile } from "./user-private-gallery";
import { UserEmptyGallery, UserEmptyGalleryMobile } from "./user-empty-gallery";
import { UserGallery, UserGalleryMobile } from "./user-gallery";
import { useNavigate, useParams } from "react-router-dom";
import { UserAccountInfo, UserAccountInfoMobile } from "./user-account-info";
import { UserBlockedGallery } from "./user-blocked-gallery";
import { useContext, useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { FollowerList } from "../followinger-list/follower-list";
import { FollowingList } from "../followinger-list/following-list";
import { Block } from "../user-relationship-modals/block-modal";
import { Close } from "../user-relationship-modals/close-modal";
import { Menu } from "./menu";
import more from "@asset/svg/menu-dots.svg";
import { BtnStyles, Button } from "../../components/button";
import { Unblock } from "../user-relationship-modals/unblock-modal";
import { UserNameContext } from "../../router/Router";
import { ChatBox } from "../chat-box/chat-box";
import { useGetChatId } from "../../services/chat";

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

export const UserPage = () => {
  const { userName } = useParams();
  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const { data, isSuccess } = useGetChatId(selectedUserName);
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
    isRefetching,
  } = useGetUserProfile(userName ?? "");
  const myUserName = useContext(UserNameContext);
  const { mutate: followMutate, isPending } = useFollowUser(
    userName ?? "",
    myUserName,
    userProfile?.followRequestState ?? "none",
  );
  const [menu, openMenu] = useState(false);
  const [modal, setModal] = useState<
    "block" | "close" | "unblock" | "message" | null
  >(null);
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
        {userProfile && (
          <Unblock user={userProfile} close={() => setModal(null)} />
        )}
      </Modal>
      <Modal
        isOpen={modal === "close"}
        close={() => {
          setModal(null);
        }}
      >
        {userProfile && (
          <Close
            user={userProfile}
            close={() => {
              setModal(null);
            }}
          />
        )}
      </Modal>
      <Modal
        isOpen={modal === "message"}
        close={() => {
          setModal(null);
        }}
      >
        {isSuccess && (
          <ChatBox
            close={() => setModal(null)}
            myUserName={myUserName}
            chatId={data.chatId}
          />
        )}
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
            openChat={() => {
              setModal("message");
            }}
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
            openChat={() => {
              setModal("message");
            }}
            userName={userProfile.userName}
            close={() => {
              setOpenFollowingList(false);
            }}
          />
        </Modal>
      )}
      <div className="flex h-40 w-[64rem] flex-row items-center justify-between gap-8 border border-x-0 border-t-0 border-solid border-form-border pb-6">
        {userProfile && (
          <>
            <UserAccountInfo
              isPending={isPending || isRefetching}
              accountInfo={userProfile}
              onFollowMethod={followMutate}
              onShowFollowingList={() => setOpenFollowingList(true)}
              onShowFollowerList={() => setOpenFollowerList(true)}
              isUserDataVisible={isUserDataVisible ?? false}
              followBtnText={followBtnText ?? ""}
              followBtnColor={(followBtnColor as BtnStyles) ?? "transparent"}
              openModal={() => setModal("unblock")}
            />

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
                canMessage={
                  userProfile?.isBlocked !== undefined &&
                  !userProfile.isBlocked &&
                  !userProfile.hasBlockedUs
                }
                closeMenu={() => {
                  openMenu(false);
                }}
                openModal={(arg: "block" | "close" | "unblock" | "message") =>
                  setModal(arg)
                }
                setSelectedUserName={() =>
                  setSelectedUserName(userProfile.userName)
                }
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
          </>
        )}
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
          openModal={() => {
            setModal("unblock");
          }}
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
    isRefetching,
  } = useGetUserProfile(userName ?? "");
  const myUserName = useContext(UserNameContext);

  const { mutate: followMutate, isPending } = useFollowUser(
    userName ?? "",
    myUserName,
    userProfile?.followRequestState ?? "none",
  );
  const [menu, openMenu] = useState(false);
  const [modal, setModal] = useState<
    "block" | "close" | "unblock" | "message" | null
  >(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (modal === "message") {
      {
        userProfile ? navigate(`/chat/${userProfile}`) : () => {};
      }
    }
  });
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
        {userProfile && (
          <Unblock user={userProfile} close={() => setModal(null)} />
        )}
      </Modal>
      <Modal
        isOpen={modal === "close"}
        close={() => {
          setModal(null);
        }}
      >
        {userProfile && (
          <Close
            user={userProfile}
            close={() => {
              setModal(null);
            }}
          />
        )}
      </Modal>
      <Modal
        isOpen={isFollowerListOpen && userProfile !== undefined}
        close={() => {
          openFollowerList(false);
        }}
      >
        <FollowerList
          userName={userProfile?.userName ?? ""}
          openChat={() => {
            navigate("/chat");
          }}
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
          openChat={() => {
            navigate("/chat");
          }}
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
              openModal={() => {
                setModal("unblock");
              }}
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
              canMessage={
                userProfile?.isBlocked !== undefined &&
                !userProfile.isBlocked &&
                !userProfile.hasBlockedUs
              }
              canBlock={!userProfile?.isBlocked}
              closeMenu={() => {
                openMenu(false);
              }}
              openModal={(arg: "block" | "close" | "unblock" | "message") =>
                setModal(arg)
              }
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
        {userProfile && (
          <Button
            classes="my-2 w-full text-center justify-center"
            btnColor={(followBtnColor as BtnStyles) ?? "transparent"}
            disabled={userProfile?.hasBlockedUs || userProfile?.isBlocked}
            isPending={isPending || isRefetching}
            type="button"
            onClick={() => {
              followMutate();
            }}
          >
            {followBtnText}
          </Button>
        )}
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
            openModal={() => {
              setModal("unblock");
            }}
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

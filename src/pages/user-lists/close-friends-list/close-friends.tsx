import { UserProfileSummary } from "../../../components/user-profile-summary";
import more from "@asset/svg/menu-dots.svg";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/modal";
import { MenuCloseFriends } from "./menu-close-friends";
import { UserInfoSummary } from "../../../types/user";
import { Block } from "../../user-relationship-modals/block-modal";
import { Unclose } from "../../user-relationship-modals/unclose-modal";
import { useInView } from "react-intersection-observer";
import { useGetCloseFriends } from "../../../services/users";
import { Loading } from "../../../components/loading";
import { useNavigate } from "react-router-dom";

export const CloseFriendsLayout = ({ mobile }: { mobile: boolean }) => {
  const [menu, openMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfoSummary>();
  const [modal, setModal] = useState<"block" | "unclose" | "message" | null>(
    null,
  );
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetCloseFriends({ limit: 1 });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    data,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);

  //navigate to chat
  useEffect(() => {
    if (modal === "message" && mobile) {
      navigate(`/chat/${selectedUser?.userName}`);
    }
  });
  return (
    <div
      className="flex w-full grow flex-col gap-4 overflow-y-scroll"
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
        <Block user={selectedUser} close={() => setModal(null)} />
      </Modal>
      {!mobile && (
        <Modal
          isOpen={modal === "message"}
          close={() => {
            setModal(null);
          }}
        >
          {
            //message-modal
          }
        </Modal>
      )}
      <Modal
        isOpen={modal === "unclose"}
        close={() => {
          setModal(null);
        }}
      >
        <Unclose
          user={selectedUser}
          close={() => {
            setModal(null);
          }}
        />
      </Modal>
      {data?.pages
        .flatMap((page) => page.followingers)
        .map((user) => (
          <div className="flex w-full justify-between" key={user.userName}>
            <UserProfileSummary
              userName={user.userName}
              profilePicture={user.profileImage}
              followerCount={user.followerCount}
            />
            <div className="relative">
              <MenuCloseFriends
                isOpen={menu && selectedUser?.userName === user.userName}
                closeMenu={() => {
                  openMenu(false);
                }}
                openModal={(arg: "block" | "unclose" | "message") =>
                  setModal(arg)
                }
              />

              <img
                src={more}
                alt=""
                className="me-5"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    selectedUser &&
                    user.userName === selectedUser.userName &&
                    menu
                  ) {
                    openMenu(false);
                  } else {
                    openMenu(true);
                    setSelectedUser(user);
                  }
                }}
              />
            </div>
          </div>
        ))}
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        className="my-3 self-center"
        ref={ref}
      />
    </div>
  );
};

export const CloseFriends = () => {
  return <CloseFriendsLayout mobile={false} />;
};

export const CloseFriendsMobile = () => {
  return <CloseFriendsLayout mobile={true} />;
};

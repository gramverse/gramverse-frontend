import { UserProfileSummary } from "../../../components/user-profile-summary";
import more from "../../../assets/svg/menu-dots.svg";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/modal";
import { MenuCloseFriends } from "./menu-close-friends";
import { UserInfoSummary } from "../../../types/user";
import { Block } from "../../user-relationship-modals/block-modal";
import { Unclose } from "../../user-relationship-modals/unclose-modal";
import { useInView } from "react-intersection-observer";
import { useGetCloseFriends } from "../../../services/users";
import { Loading } from "../../../components/loading";

export const CloseFriendsLayout = () => {
  const [menu, openMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfoSummary>();
  const [modal, setModal] = useState<"block" | "unclose" | null>(null);
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
                openModal={(arg: "block" | "unclose") => setModal(arg)}
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
  return <CloseFriendsLayout />;
};

export const CloseFriendsMobile = () => {
  return <CloseFriendsLayout />;
};

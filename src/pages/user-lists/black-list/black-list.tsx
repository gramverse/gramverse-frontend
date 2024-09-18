import { UserProfileSummary } from "../../../components/user-profile-summary";
import more from "../../../assets/svg/menu-dots.svg";
import { useEffect, useState } from "react";
import { MenuBlock } from "./menu-block";
import { Modal } from "../../../components/modal";
import { Unblock } from "../../user-relationship-modals/unblock-modal";
import { UserInfoSummary } from "../../../types/user";
import { useGetBlackList } from "../../../services/users";
import { useInView } from "react-intersection-observer";
import { Loading } from "../../../components/loading";
export const BlackListLayout = () => {
  const [menu, openMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfoSummary>();
  const [modal, setModal] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetBlackList({ limit: 1 });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && isFetchingNextPage) {
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
        isOpen={modal}
        close={() => {
          setModal(false);
        }}
      >
        <Unblock user={selectedUser} close={() => setModal(false)} />
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
              <MenuBlock
                isOpen={menu && selectedUser?.userName === user.userName}
                closeMenu={() => {
                  openMenu(false);
                }}
                openModal={() => {
                  setModal(true);
                }}
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

export const BlackList = () => {
  return <BlackListLayout />;
};
export const BlackListMobile = () => {
  return <BlackListLayout />;
};

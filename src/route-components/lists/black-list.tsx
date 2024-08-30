import { UserProfileSummary } from "../../reusable-components/user-profile-summary";
import more from "../../assets/svg/menu-dots.svg";
import { useState } from "react";
import { MenuBlock } from "./menu-block";
import { Modal } from "../../reusable-components/modal";
import { Unblock } from "./unblock-modal";
import { UserInfoSummary } from "../../common/types/user";
const sampleUsers = [
  {
    userName: "alice_wonder",
    followerCount: 1250,
    profileImage: "https://example.com/alice.jpg",
  },
  {
    userName: "bob_builder",
    followerCount: 980,
    profileImage: "https://example.com/bob.jpg",
  },
  {
    userName: "charlie_chocolate",
    followerCount: 3500,
  },
  {
    userName: "diana_prince",
    followerCount: 10200,
    profileImage: "https://example.com/diana.jpg",
  },
  {
    userName: "evan_almighty",
    followerCount: 750,
  },
  {
    userName: "fiona_shrek",
    followerCount: 5600,
    profileImage: "https://example.com/fiona.jpg",
  },
  {
    userName: "george_jungle",
    followerCount: 2100,
  },
  {
    userName: "hermione_granger",
    followerCount: 8900,
    profileImage: "https://example.com/hermione.jpg",
  },
  {
    userName: "ian_malcolm",
    followerCount: 4200,
  },
  {
    userName: "julia_child",
    followerCount: 6700,
    profileImage: "https://example.com/julia.jpg",
  },
  {
    userName: "kevin_mccallister",
    followerCount: 1800,
  },
  {
    userName: "lara_croft",
    followerCount: 12500,
    profileImage: "https://example.com/lara.jpg",
  },
  {
    userName: "marty_mcfly",
    followerCount: 3300,
  },
  {
    userName: "neo_matrix",
    followerCount: 9900,
    profileImage: "https://example.com/neo.jpg",
  },
  {
    userName: "olivia_benson",
    followerCount: 7100,
  },
];
export const BlackListLayout = () => {
  const [menu, openMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfoSummary>();
  const [modal, openModal] = useState(false);
  return (
    <div
      className="flex w-full flex-col gap-4 overflow-y-scroll"
      onClick={() => {
        openMenu(false);
      }}
    >
      <Modal
        isOpen={modal}
        close={() => {
          openModal(false);
        }}
      >
        <Unblock
          user={selectedUser}
          close={() => {
            openModal(false);
          }}
        />
      </Modal>
      {sampleUsers.map((user) => (
        <div className="flex w-full justify-between" key={user.userName}>
          <UserProfileSummary
            userName={user.userName}
            // profilePicture={user.profileImage}
            followerCount={user.followerCount}
          />
          <div className="relative">
            <MenuBlock
              isOpen={menu && selectedUser?.userName === user.userName}
              closeMenu={() => {
                openMenu(false);
              }}
              openModal={() => {
                openModal(true);
              }}
            />

            <img
              src={more}
              alt=""
              className="me-5"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUser(user);
                openMenu(true);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const BlackList = () => {
  return <BlackListLayout />;
};
export const BlackListMobile = () => {
  return <BlackListLayout />;
};

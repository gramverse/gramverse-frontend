import { UserProfileSummary } from "../../reusable-components/user-profile-summary";
import more from "../../assets/svg/menu-dots.svg";
import { useState } from "react";
import { Modal } from "../../reusable-components/modal";
import { MenuCloseFriends } from "./menu-close-friends";
import { UserInfoSummary } from "../../common/types/user";
import { Block } from "./block-modal";
import { Unclose } from "./unclose-modal";
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
export const CloseFriendsLayout = () => {
  const [menu, openMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfoSummary>();
  const [modal, setModal] = useState<"block" | "unclose" | null>(null);
  return (
    <div
      className="flex w-full flex-col gap-4 overflow-y-scroll"
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
      {sampleUsers.map((user) => (
        <div className="flex w-full justify-between" key={user.userName}>
          <UserProfileSummary
            userName={user.userName}
            // profilePicture={user.profileImage}
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

export const CloseFriends = () => {
  return <CloseFriendsLayout />;
};

export const CloseFriendsMobile = () => {
  return <CloseFriendsLayout />;
};

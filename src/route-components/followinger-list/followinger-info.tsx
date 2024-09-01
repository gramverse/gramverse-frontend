import { FollowingerInfo } from "../../common/types/followinger-info";
import PersonIcon from "../../assets/svg/profile.svg";
import { useNavigate } from "react-router-dom";
import { Menu } from "./menu";
import { useState } from "react";
import more from "../../assets/svg/menu-dots.svg";
interface FollowerInfoProps extends FollowingerInfo {
  close?: () => void;
  follower: boolean;
  selectedUser: string;
  setUser: (user: string) => void;
}

export const FollowingersInfo = ({
  userName,
  followerCount,
  profileImage,
  close,
  follower,
  selectedUser,
  setUser,
}: FollowerInfoProps) => {
  const isSetProfileImage = profileImage && profileImage != "";
  const navigate = useNavigate();
  const [menu, openMenu] = useState(false);
  return (
    <div
      className="flex h-20 w-fit min-w-80 flex-row items-center border border-x-0 border-t-0 border-solid border-form-border"
      onClick={() => {
        close?.();
        navigate(`/${userName}`);
      }}
    >
      <label className="ml-4 block h-14 w-14 overflow-hidden rounded-full">
        <img
          className="h-full w-full object-cover"
          src={isSetProfileImage ? profileImage : PersonIcon}
        />
      </label>
      <div className="flex h-12 w-48 flex-col">
        <div className="text-sm font-bold">{userName}</div>
        <div className="text-xs font-normal">{`${followerCount} دنبال کننده`}</div>
      </div>
      <div className="relative justify-self-end">
        <Menu
          isOpen={menu && selectedUser === userName}
          closeMenu={() => {
            openMenu(false);
          }}
          follower={follower}
        />

        <img
          src={more}
          alt=""
          className="me-5"
          onClick={(e) => {
            e.stopPropagation();
            if (userName === selectedUser && menu) {
              console.log(selectedUser);
              console.log(userName);
              openMenu(false);
            } else {
              openMenu(true);
              setUser(userName);
            }
          }}
        />
      </div>
    </div>
  );
};

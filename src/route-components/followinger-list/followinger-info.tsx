import { FollowingerInfo } from "../../common/types/followinger-info";
import PersonIcon from "../../assets/svg/profile.svg";
import { Menu, MenuMobile } from "./menu";
import { useState } from "react";
import more from "../../assets/svg/menu-dots.svg";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
interface FollowerInfoProps extends FollowingerInfo {
  close?: () => void;
  follower: boolean;
  selectedUser?: string;
  setUser?: (user: string) => void;
  activityPermit: boolean;
  myUserName?: string;
  noBorder?: boolean;
}

export const FollowingersInfo = ({
  userName,
  followerCount,
  profileImage,
  close,
  follower,
  selectedUser,
  setUser,
  activityPermit,
  noBorder = false,
}: FollowerInfoProps) => {
  const isSetProfileImage = profileImage && profileImage != "";
  const [menu, openMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      // className="flex h-20 w-full flex-row items-center border border-x-0 border-t-0 border-solid border-form-border"
      className={clsx(
        "flex h-20 w-full flex-row items-center",
        noBorder
          ? ""
          : "border border-x-0 border-t-0 border-solid border-form-border",
      )}
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
        {activityPermit && (
          <>
            <Menu
              isOpen={menu && selectedUser === userName}
              closeMenu={() => {
                openMenu(false);
              }}
              follower={follower}
              userName={userName}
            />
            <img
              src={more}
              alt=""
              className="mr-16"
              onClick={(e) => {
                e.stopPropagation();
                if (userName === selectedUser && menu) {
                  console.log(selectedUser);
                  console.log(userName);
                  openMenu(false);
                } else {
                  openMenu(true);
                  setUser?.(userName);
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const FollowingersInfoMobile = ({
  userName,
  followerCount,
  profileImage,
  close,
  follower,
  selectedUser,
  setUser,
  activityPermit,
  myUserName,
}: FollowerInfoProps) => {
  const isSetProfileImage = profileImage && profileImage != "";
  const [menu, openMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="flex h-20 w-full flex-row items-center border border-x-0 border-t-0 border-solid border-form-border"
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
        {activityPermit && (
          <>
            <MenuMobile
              isOpen={menu && selectedUser === userName}
              closeMenu={() => {
                openMenu(false);
              }}
              follower={follower}
              userName={userName}
              myUserName={myUserName}
            />
            <img
              src={more}
              alt=""
              className="mr-16"
              onClick={(e) => {
                e.stopPropagation();
                if (userName === selectedUser && menu) {
                  console.log(selectedUser);
                  console.log(userName);
                  openMenu(false);
                } else {
                  openMenu(true);
                  setUser?.(userName);
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

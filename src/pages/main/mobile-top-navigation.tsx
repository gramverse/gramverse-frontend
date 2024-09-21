import menu from "@asset/svg/menu.svg";
import { useState } from "react";
import { ModalMobile } from "../../components/modal";
import { DrawerMenu } from "./mobile-drawer-menu";
import { ProfileSummary } from "../../components/profile-summary";
export default function MobileTopNavigation() {
  const [isMenuOpen, openMenu] = useState(false);

  return (
    <div className="mb-5 flex w-full flex-col justify-center bg-primary">
      <ModalMobile
        isOpen={isMenuOpen}
        close={() => {
          openMenu(false);
        }}
      >
        <DrawerMenu
          close={() => {
            openMenu(false);
          }}
        />
      </ModalMobile>

      <div className="mb-3 mt-2 flex h-10 w-full justify-between">
        <ProfileSummary hasUserName={false} size={"medium"} />
        <img
          src={menu}
          alt=""
          className="w-6"
          onClick={() => {
            openMenu(true);
          }}
        />
      </div>
      <div className="h-0.5 bg-gray-300" />
    </div>
  );
}

import { useGetProfile } from "../../api-hooks/get-my-profile";
import menu from "../../assets/svg/menu.svg";
import profile from "../../assets/svg/profile.svg";
import { RoundPicture } from "../../reusable-components/profile-picture";
import { useContext } from "react";
import { ModalContext } from "./main";
import { DrawerMenu } from "./mobile-drawer-menu";
export default function MobileTopNavigation({
  handleItemClick,
}: {
  handleItemClick: (item: string) => void;
}) {
  const { data: profileSummary } = useGetProfile();
  const { setModal } = useContext(ModalContext);
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="mx-5 ms-10 flex h-10 w-64 justify-between p-3">
        <RoundPicture
          picture={
            profileSummary?.profileImage ? profileSummary.profileImage : profile
          }
          onClick={() => handleItemClick("myPage")}
        />
        <img
          src={menu}
          alt=""
          className="w-6"
          onClick={() => {
            setModal(<DrawerMenu handleItemClick={handleItemClick} />);
          }}
        />
      </div>
      <div className="h-0.5 w-full bg-gray-300" />
    </div>
  );
}

import { useGetProfile } from "../../api-hooks/get-my-profile";
import menu from "../../assets/svg/menu.svg";
import profile from "../../assets/svg/profile.svg";
import { RoundPicture } from "../../reusable-components/profile-picture";

export default function MobileTopNavigation({
  handleItemClick,
  toggleDrawer,
}: {
  handleItemClick: (item: string) => void;
  toggleDrawer: () => void;
}) {
  const { data: profileSummary } = useGetProfile();

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="mx-5 ms-10 flex h-10 w-64 justify-between p-3">
        <RoundPicture
          picture={
            profileSummary?.profileImage ? profileSummary.profileImage : profile
          }
          onClick={() => handleItemClick("myPage")}
        />
        <img src={menu} alt="" className="w-6" onClick={toggleDrawer} />
      </div>
      <div className="h-0.5 w-full bg-gray-300" />
    </div>
  );
}

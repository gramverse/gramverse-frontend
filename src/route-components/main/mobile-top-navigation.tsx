import { useGetProfileSummary } from "../../api-hooks/main";
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
  const { data: profileSummary } = useGetProfileSummary();

  return (
    <div className="w-full flex flex-col justify-center absolute top-5">
      <div className="flex w-64 h-10 p-3 mx-5 ms-10 justify-between ">
        <RoundPicture
          picture={
            profileSummary?.profilePicture
              ? profileSummary.profilePicture
              : profile
          }
          onClick={() => handleItemClick("myPage")}
        />
        <img src={menu} alt="" className="w-6" onClick={toggleDrawer} />
      </div>
      <div className="w-full h-0.5 bg-gray-300" />
    </div>
  );
}

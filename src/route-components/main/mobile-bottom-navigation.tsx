import explore from "../../assets/svg/explore.svg";
import search from "../../assets/svg/search.svg";
import plus from "../../assets/svg/plus.svg";

export default function MobileBottomNavigation({
  handleItemClick,
  toggleDrawer,
}: {
  handleItemClick: (item: string) => void;
  toggleDrawer: () => void;
}) {
  return (
    <div className="w-full absolute bottom-0 ml-9">
      <button
        className="redColor border-none w-12 h-12 rounded-full absolute bottom-10 right-1/2 left-1/2 z-10"
        onClick={toggleDrawer}
      >
        <img src={plus} alt="" />
      </button>
      <div className="flex h-12 py-3 px-10 bg-white w-80 mx-12 justify-between place-self-center rounded-full absolute bottom-4">
        <img src={search} alt="" onClick={() => handleItemClick("search")} />
        <img src={explore} alt="" onClick={() => handleItemClick("explore")} />
      </div>
    </div>
  );
}

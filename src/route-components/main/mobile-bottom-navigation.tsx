import explore from "../../assets/svg/explore.svg";
import search from "../../assets/svg/search.svg";
import plus from "../../assets/svg/plus.svg";

export default function MobileBottomNavigation({
  handleItemClick,
}: {
  handleItemClick: (item: string) => void;
}) {
  return (
    <div className="w-full flex flex-row justify-center absolute bottom-5">
      <button className="redColor border-none w-12 h-12 rounded-full flex items-center justify-center absolute bottom-10 z-10">
        <img src={plus} className="w-5" alt="" />
      </button>
      <div className="flex w-64 h-10 py-3 px-7 bg-white mx-5 justify-between rounded-full border-solid border-2 border-gray-200">
        <img
          src={search}
          alt=""
          className="w-6"
          onClick={() => handleItemClick("search")}
        />
        <img
          src={explore}
          className="w-6"
          alt=""
          onClick={() => handleItemClick("explore")}
        />
      </div>
    </div>
  );
}

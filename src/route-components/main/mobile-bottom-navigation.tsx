import explore from "../../assets/svg/explore.svg";
import search from "../../assets/svg/search.svg";
import plus from "../../assets/svg/plus.svg";

export default function MobileBottomNavigation({
  handleItemClick,
}: {
  handleItemClick: (item: string) => void;
}) {
  return (
    <div className="relative mb-4 flex w-full flex-row justify-center">
      <button
        className="absolute bottom-10 z-10 flex h-12 w-12 items-center justify-center rounded-full border-none bg-submit-btn"
        onClick={() => {
          handleItemClick("createPost");
        }}
      >
        <img src={plus} className="w-5" alt="" />
      </button>
      <div className="mx-5 flex h-10 w-64 justify-between rounded-full border-2 border-solid border-gray-200 bg-white px-7 py-3">
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

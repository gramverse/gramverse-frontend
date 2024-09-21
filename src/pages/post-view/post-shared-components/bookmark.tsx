import { MouseEventHandler } from "react";
import bookmark from "@asset/svg/bookmark.svg";
import bookmarkFill from "@asset/svg/bookmark-fill.svg";
type BookmarkProps = {
  isBookmarked: boolean | undefined;
  onClick?: MouseEventHandler<HTMLDivElement>;
  count?: number | undefined;
};
export const Bookmark = ({ isBookmarked, onClick, count }: BookmarkProps) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center gap-2"
      onClick={onClick}
    >
      <img src={isBookmarked ? bookmarkFill : bookmark} alt="" />
      <small>{count}</small>
    </div>
  );
};

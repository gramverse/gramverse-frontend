import { MouseEventHandler } from "react";
import bookmark from "../../../assets/svg/bookmark.svg";
import bookmarkFill from "../../../assets/svg/bookmark-fill.svg";
type BookmarkProps = {
  isBookmarked: boolean | undefined;
  defaultValue: boolean | undefined;
  onClick: MouseEventHandler<HTMLDivElement>;
  count?: number | undefined;
};
export const Bookmark = ({
  isBookmarked,
  defaultValue,
  onClick,
  count,
}: BookmarkProps) => {
  const bookmarkValue = isBookmarked == undefined ? defaultValue : isBookmarked;
  return (
    <div className="flex flex-col items-center gap-2" onClick={onClick}>
      <img src={bookmarkValue ? bookmarkFill : bookmark} alt="" />
      <small>{count}</small>
    </div>
  );
};

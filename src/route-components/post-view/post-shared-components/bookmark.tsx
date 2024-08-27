import clsx from "clsx";
import { MouseEventHandler } from "react";

type BookmarkProps = {
  isBookmarked: boolean | undefined;
  defaultValue: boolean | undefined;
  onClick: MouseEventHandler<SVGSVGElement>;
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
    <div className="flex flex-col items-center gap-1">
      <svg
        width="15"
        height="26 "
        viewBox="0 2 15 22"
        className={clsx(bookmarkValue ? "fill-secondary" : "fill-none")}
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path
          d="M2.5 16.7093V2.75584H12.5V16.7093L7.5 13.4372L2.5 16.7093ZM7.5 16.5756L12.4667 19.821C12.7189 19.9853 13.0073 20.0749 13.3025 20.0808C13.5977 20.0866 13.8891 20.0084 14.1468 19.8542C14.4045 19.7 14.6193 19.4754 14.7692 19.2032C14.9191 18.9311 14.9988 18.6212 15 18.3053V2.75584C15 2.04645 14.7366 1.3661 14.2678 0.864482C13.7989 0.362862 13.163 0.0810547 12.5 0.0810547H2.5C1.83696 0.0810547 1.20107 0.362862 0.732234 0.864482C0.263393 1.3661 5.79737e-07 2.04645 5.79737e-07 2.75584V18.2964C-0.000246241 18.613 0.0783233 18.924 0.227633 19.1975C0.376944 19.4709 0.591609 19.6968 0.849565 19.852C1.10752 20.0073 1.39946 20.0862 1.69538 20.0808C1.9913 20.0753 2.28053 19.9857 2.53333 19.821L7.5 16.5756Z"
          fill="#EA5A69"
        />
      </svg>
      <small>{count}</small>
    </div>
  );
};

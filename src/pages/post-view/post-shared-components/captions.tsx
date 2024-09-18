import clsx from "clsx";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { PostDetail } from "../../../types/post-detail";
import { useNavigate } from "react-router-dom";

interface Captions
  extends Pick<PostDetail, "creationDate" | "mentions" | "caption" | "tags"> {
  close?: () => void;
}

export const PostCaptions = (props: Captions) => {
  const {
    tags: hashtags,
    caption,
    mentions,
    creationDate,
    close,
    ...rest
  } = props;
  const date = new Date(creationDate);
  const now = new Date();
  const navigate = useNavigate();
  return (
    <section
      className={clsx(
        "my-4 flex h-min w-[335px] flex-col justify-start gap-8 px-5",
      )}
      {...rest}
    >
      <small>{getTimeDifference(now, date)}</small>
      {caption && <p className="m-0 min-h-0 p-0 text-sm">{caption}</p>}
      {!!hashtags?.length && (
        <div className="flex flex-wrap gap-1">
          {hashtags?.map((hashtag) => (
            <span key={hashtag} className="rounded-lg bg-red-100 p-1 text-xs">
              {hashtag}
            </span>
          ))}
        </div>
      )}
      {!!mentions?.length && (
        <div className="flex flex-wrap gap-1">
          {mentions?.map((mention) => (
            <span
              key={mention}
              className="rounded-lg bg-emerald-200 p-1 text-xs"
              onClick={() => {
                close?.();
                navigate(`/${mention}`);
              }}
            >
              {mention}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

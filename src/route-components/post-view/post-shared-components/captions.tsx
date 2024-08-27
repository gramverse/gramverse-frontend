import clsx from "clsx";
import { getTimeDifference } from "../../../utilitis.ts/time-difference";
import { PostDetail } from "../../../common/types/post-detail";

interface Captions
  extends Pick<PostDetail, "creationDate" | "mentions" | "caption" | "tags"> {}

export const PostCaptions = (props: Captions) => {
  const { tags: hashtags, caption, mentions, creationDate, ...rest } = props;
  const date = new Date(creationDate);
  const now = new Date();
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
        <div lang="fa" dir="rtl">
          {hashtags?.map((hashtag) => (
            <span key={hashtag} className="m-2 rounded-lg bg-red-100 p-2">
              {hashtag}
            </span>
          ))}
        </div>
      )}
      {!!mentions?.length && (
        <div className="flex flex-wrap overflow-x-clip text-xs">
          {mentions?.map((mention) => (
            <span
              key={mention}
              className="m-2 rounded-lg bg-emerald-200 p-2 text-xs"
            >
              {mention}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

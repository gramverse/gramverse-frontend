import { useState } from "react";
import { useBookmarkPost, useLikePost } from "../../../api-hooks/post-details";
import { Bookmark } from "./bookmark";
import { Like } from "./like";
import { PostDetailSchema } from "../../../common/types/post-detail";
import { Comment } from "./comment-count";
import { z } from "zod";

export const PostDetailSummary = ({
  post,
}: {
  post: z.infer<typeof PostDetailSchema> | undefined;
}) => {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
    undefined,
  );
  const { mutate: likeMutate } = useLikePost();
  const { mutate: bookmarkMutate } = useBookmarkPost();
  return (
    <div className="m-3 flex h-[61px] flex-row items-center justify-end gap-4">
      <Like
        defaultValue={post?.isLiked}
        count={post?.likesCount}
        isLiked={isLiked}
        onClick={() => {
          const likeValue = isLiked == undefined ? true : !isLiked;
          setIsLiked(likeValue);
          likeMutate({
            postId: post?._id ?? "",
            isLike: likeValue ?? false,
          });
        }}
      />
      <Bookmark
        defaultValue={post?.isBookmarked}
        count={post?.bookmarksCount}
        isBookmarked={isBookmarked}
        onClick={() => {
          setIsBookmarked(!isBookmarked);
          const bookmarkValue =
            isBookmarked == undefined ? true : !isBookmarked;
          bookmarkMutate({
            postId: post?._id ?? "",
            isBookmark: bookmarkValue ?? false,
          });
        }}
      />

      <Comment
        count={post?.commentsCount}
        onClick={() => {
          setIsBookmarked(!isBookmarked);
          const bookmarkValue =
            isBookmarked == undefined ? true : !isBookmarked;
          bookmarkMutate({
            postId: post?._id ?? "",
            isBookmark: bookmarkValue ?? false,
          });
        }}
      />
    </div>
  );
};

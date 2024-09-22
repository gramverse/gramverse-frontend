import { useBookmarkPost, useLikePost } from "../../../services/post-details";
import { Bookmark } from "./bookmark";
import { Like } from "./like";
import { PostDetailSchema } from "../../../types/post-detail";
import { Comment } from "./comment-count";
import { z } from "zod";
import { useState } from "react";

export const PostDetailSummary = ({
  post,
  isRefetching,
}: {
  post: z.infer<typeof PostDetailSchema> | undefined;
  isRefetching: boolean;
}) => {
  const { mutate: likeMutate, isPending: isLikePending } = useLikePost();
  const { mutate: bookmarkMutate, isPending: isBookmarkPending } =
    useBookmarkPost();

  const [isLiked, setIsLiked] = useState(post?.isLiked ?? false);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked ?? false);

  if (!post) return <div className="m-3 h-[61px]" />;
  const changeInLikes = post.isLiked ? -1 : 1;
  const likesCount =
    post.likesCount + (isLikePending || isRefetching ? changeInLikes : 0);

  const changeInBookmark = post.isBookmarked ? -1 : 1;
  const BookmarkCount =
    post.bookmarksCount +
    (isBookmarkPending || isRefetching ? changeInBookmark : 0);
  return (
    <div className="m-3 flex h-[61px] flex-row items-center justify-end gap-4">
      <Like
        count={likesCount}
        isLiked={isLikePending || isRefetching ? isLiked : post.isLiked}
        onClick={() => {
          setIsLiked((isLiked) => !isLiked);
          likeMutate({
            postId: post._id,
            isLike: !post.isLiked,
          });
        }}
      />
      <Bookmark
        count={BookmarkCount}
        isBookmarked={
          isBookmarkPending || isRefetching ? isBookmarked : post.isBookmarked
        }
        onClick={() => {
          setIsBookmarked((isBookmarked) => !isBookmarked);
          bookmarkMutate({
            postId: post._id,
            isBookmark: !post.isBookmarked,
          });
        }}
      />

      <Comment
        count={post.commentsCount}
        onClick={() => {
          (document.querySelector("#addComment") as HTMLElement).focus();
        }}
      />
    </div>
  );
};

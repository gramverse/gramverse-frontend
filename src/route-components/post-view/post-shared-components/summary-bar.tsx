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
  const {
    mutate: likeMutate,
    isPending: isLikePending,
    variables: likeVars,
  } = useLikePost();
  const {
    mutate: bookmarkMutate,
    isPending: isBookmarkPending,
    variables: bookmarkVars,
  } = useBookmarkPost();

  if (!post) return <div className="m-3 h-[61px]" />;

  const changeInLikes = post.isLiked ? -1 : 1;
  const likesCount = post.likesCount + (isLikePending ? changeInLikes : 0);

  const changeInBookmark = post.isBookmarked ? -1 : 1;
  const BookmarkCount =
    post.bookmarksCount + (isBookmarkPending ? changeInBookmark : 0);
  return (
    <div className="m-3 flex h-[61px] flex-row items-center justify-end gap-4">
      <Like
        count={likesCount}
        isLiked={isLikePending ? likeVars.isLike : post.isLiked}
        onClick={() => {
          likeMutate({
            postId: post._id,
            isLike: !post.isLiked,
          });
        }}
      />
      <Bookmark
        count={BookmarkCount}
        isBookmarked={
          isBookmarkPending ? bookmarkVars.isBookmark : post.isBookmarked
        }
        onClick={() => {
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

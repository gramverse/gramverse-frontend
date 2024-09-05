import { useEffect, useState } from "react";
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
  const [isLiked, setIsLiked] = useState<boolean | undefined>(post?.isLiked);
  useEffect(() => {
    setIsLiked(post?.isLiked);
  }, [post?.isLiked]);
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
    post?.isBookmarked,
  );
  useEffect(() => {
    setIsBookmarked(post?.isBookmarked);
  }, [post?.isBookmarked]);
  const { mutate: likeMutate } = useLikePost();
  const { mutate: bookmarkMutate } = useBookmarkPost();

  return (
    <div className="m-3 flex h-[61px] flex-row items-center justify-end gap-4">
      <Like
        count={post?.likesCount}
        isLiked={isLiked}
        onClick={() => {
          post
            ? likeMutate({
                postId: post?._id ?? "",
                isLike: !isLiked,
              })
            : () => {};
          setIsLiked((isLiked) => !isLiked);
        }}
      />
      <Bookmark
        count={post?.bookmarksCount}
        isBookmarked={isBookmarked}
        onClick={() => {
          post
            ? bookmarkMutate({
                postId: post?._id ?? "",
                isBookmark: !isBookmarked,
              })
            : () => {};
          setIsBookmarked((isBookmarked) => !isBookmarked);
        }}
      />

      <Comment count={post?.commentsCount} onClick={() => {}} />
    </div>
  );
};

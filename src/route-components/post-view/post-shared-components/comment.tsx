import clsx from "clsx";
import { CommentDto, CommentFieldProps } from "../../../common/types/comment";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { Like } from "./like";
import { useLikeComment } from "../../../api-hooks/comment";
import reply from "../../../assets/svg/reply.svg";
import { useState } from "react";
export const Comment = ({
  comment,
  postId,
  setCommentProps,
  key,
}: {
  comment: Omit<CommentDto, "childDtos">;
  postId: string;
  setCommentProps: (props: CommentFieldProps) => void;
  key: string;
}) => {
  const { mutate } = useLikeComment({ postId });
  const [isLiked, setIsLiked] = useState<boolean | undefined>(comment.isLiked);

  return (
    <div className="flex w-full" key={key}>
      <span className={clsx({ "w-12": comment.parentCommentId !== "" })} />

      <div
        className={clsx("flex w-full flex-col justify-between gap-3")}
        key={comment._id}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-l font-bold">{comment.userName}</span>
            <small className="text-xs">
              {getTimeDifference(new Date(), new Date(comment.creationDate))}
            </small>
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <div className="flex items-center gap-1">
              <Like
                display="row"
                count={comment.likesCount}
                isLiked={isLiked}
                onClick={() => {
                  mutate({
                    commentId: comment._id,
                    isLike: !isLiked,
                  });
                  setIsLiked((isLiked) => !isLiked);
                }}
              />
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() => {
                setCommentProps({
                  parentCommentId: comment._id,
                  parentCommentUserName: comment.userName,
                });
              }}
            >
              <span className="text-xs">پاسخ</span>
              <img src={reply} className="w-4" alt="" />
            </div>
          </div>
        </div>
        <span>{comment.comment}</span>
      </div>
    </div>
  );
};

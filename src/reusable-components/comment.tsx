import { useGetProfile } from "../api-hooks/get-my-profile";
import { InputField } from "./input-field";
import { RoundPicture } from "./profile-picture";
import send from "../assets/svg/letter.svg";
import { useState } from "react";
import { useLikeComment, useSendComment } from "../api-hooks/comment";
import { CommentProps } from "../common/types/comment";
import { CommentDto } from "../common/types/post";
import heartFill from "../assets/svg/heart.svg";
import reply from "../assets/svg/reply.svg";
import heartOutline from "../assets/svg/heart-outline.svg";
import { getTimeDifference } from "../utilitis.ts/time-difference";

export const Comment = (props: CommentProps) => {
  const { data: profile } = useGetProfile();
  const [comment, setComment] = useState(props.parentCommentUsername);
  const { mutate } = useSendComment(props.postId);
  return (
    <div>
      <div className="flex w-[300px] items-center justify-between gap-5">
        <RoundPicture size="small" picture={profile?.profileImage ?? ""} />
        <InputField
          placeholder="نظر خود را بنویسید"
          value={comment}
          onInput={(e) => {
            setComment((e.target as HTMLInputElement).value);
          }}
          onChange={(e) => {
            setComment((e.target as HTMLInputElement).value);
          }}
        />
        <img
          src={send}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            if (comment.includes(`@${props.parentCommentUsername}}`)) {
              mutate({
                comment: comment,
                parentCommentId: props.parentCommentId,
                postId: props.postId,
              });
            } else {
              mutate({
                comment: comment,
                parentCommentId: "",
                postId: props.postId,
              });
            }
          }}
        />
      </div>
    </div>
  );
};

interface CommentsView {
  comments: CommentDto[];
  setCommentProps: React.Dispatch<React.SetStateAction<CommentProps>>;
}

export const ViewComments = ({ comments, setCommentProps }: CommentsView) => {
  const { mutate } = useLikeComment();
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className="mb-2 flex w-full flex-col justify-between gap-3">
            <div className="relative flex w-full items-center justify-start gap-2">
              <span className="text-xl font-bold">{comment.userName}</span>
              <small className="text-xs">
                {getTimeDifference(new Date(), new Date(comment.creationDate))}
              </small>
              <div className="absolute left-0 flex gap-3">
                <div className="flex gap-2">
                  <span>{comment.likesCount}</span>
                  <img
                    src={comment.isLiked ? heartFill : heartOutline}
                    alt=""
                    onClick={() => {
                      mutate({
                        isLike: !comment.isLiked,
                        commentId: comment._id,
                      });
                    }}
                  />
                </div>
                <div
                  className="flex gap-2"
                  onClick={() => {
                    setCommentProps({
                      parentCommentId: comment.parentCommentId,
                      parentCommentUsername: comment.userName,
                      postId: comment.postId,
                    });
                  }}
                >
                  <span>پاسخ</span>
                  <img src={reply} alt="" />
                </div>
              </div>
            </div>
            <span>{comment.comment}</span>
          </div>
        );
      })}
    </div>
  );
};

import { useEffect, useState } from "react";
import {
  useGetComments,
  useLikeComment,
  useSendComment,
} from "../../../api-hooks/comment";
import { useGetProfile } from "../../../api-hooks/get-my-profile";
import send from "../../../assets/svg/letter.svg";
import person from "../../../assets/svg/profile.svg";
import reply from "../../../assets/svg/reply.svg";
import {
  CommentProps,
  CommentsArray,
  SingleComment,
} from "../../../common/types/comment";
import { InputField } from "../../../reusable-components/input-field";
import { RoundPicture } from "../../../reusable-components/profile-picture";
import { Like } from "../../../route-components/post-view/post-shared-components/like";
import { getTimeDifference } from "../../../utilitis.ts/time-difference";
import { Button } from "../../../reusable-components/button";

export const Comment = (props: CommentProps) => {
  const { data: profile } = useGetProfile();
  const [comment, setComment] = useState(props.parentCommentUserName);
  const { mutate } = useSendComment(props.postId);
  return (
    <div>
      <div className="flex items-center justify-around">
        <RoundPicture
          size="small"
          picture={
            profile?.profileImage && profile.profileImage !== ""
              ? profile.profileImage
              : person
          }
        />
        <InputField
          placeholder="نظر خود را بنویسید"
          usesError={false}
          value={comment}
          fieldsize={"mobile"}
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
            if (comment.includes(`@${props.parentCommentUserName}}`)) {
              mutate({
                comment: comment,
                parentCommentId: props.parentCommentId,
                postId: props.postId,
                parentCommentUserName: props.parentCommentUserName,
              });
            } else {
              mutate({
                comment: comment,
                parentCommentId: "",
                postId: props.postId,
                parentCommentUserName: "",
              });
            }
          }}
        />
      </div>
    </div>
  );
};

interface CommentsView {
  postId: string;
  setCommentProps: React.Dispatch<React.SetStateAction<CommentProps>>;
}

const flattenComments = (data: CommentsArray) => {
  const flattened: Omit<SingleComment, "childDtos">[] = [];
  const flatten = (comment: SingleComment) => {
    const { childDtos, ...rest } = comment;
    flattened.push(rest);
    if (childDtos.length > 0) {
      childDtos.forEach((child) => {
        flatten(child);
      });
    } else {
      return;
    }
  };
  data.forEach((comment) => {
    flatten(comment);
  });
  return flattened;
};
export const ViewComments = ({ postId, setCommentProps }: CommentsView) => {
  const { mutate } = useLikeComment({ postId });
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const [comments, setComments] = useState<Omit<SingleComment, "childDtos">[]>(
    [],
  );
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useGetComments({ postId });
  useEffect(() => {
    const lastChunckOfData = data?.pages.slice(-1)[0].comments;
    if (isSuccess) {
      setComments((comments) =>
        comments.concat(flattenComments(lastChunckOfData ?? [])),
      );
    }
  }, [data?.pages, isSuccess]);
  return (
    <div className="h-[200px] overflow-scroll">
      {comments.map((comment) => {
        return (
          <div className="mb-2 flex w-full flex-col justify-between gap-3">
            <div className="relative flex w-full items-center justify-start gap-2">
              <span className="text-xl font-bold">{comment.userName}</span>
              <small className="text-xs">
                {getTimeDifference(new Date(), comment.creationDate)}
              </small>
              <div className="absolute left-0 flex gap-3">
                <div className="flex gap-2">
                  <span>{comment.likesCount}</span>
                  <Like
                    defaultValue={comment.isLiked}
                    isLiked={isLiked}
                    onClick={() => {
                      const likeValue = isLiked == undefined ? true : !isLiked;
                      setIsLiked(likeValue);
                      mutate({
                        commentId: comment._id,
                        isLike: likeValue ?? false,
                      });
                    }}
                  />
                </div>
                <div
                  className="flex gap-2"
                  onClick={() => {
                    setCommentProps({
                      parentCommentId: comment.parentCommentId,
                      parentCommentUserName: comment.userName,
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
      <div>
        {isFetching && (
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <Button
          btnColor="transparent"
          disabled={isFetchingNextPage ?? hasNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "درحال بارگیری"
            : hasNextPage
              ? "بارگیری بیشتر"
              : ""}
        </Button>
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
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
  CommentDto,
  CommentFieldProps,
  CommentsArray,
  SingleComment,
} from "../../../common/types/comment";
import { InputField } from "../../../reusable-components/input-field";
import { RoundPicture } from "../../../reusable-components/profile-picture";
import { Like } from "../../../route-components/post-view/post-shared-components/like";
import { getTimeDifference } from "../../../utilitis.ts/time-difference";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { Loading } from "../../../reusable-components/loading";

type CommentProps = {
  parentCommentId: string;
  parentCommentUserName: string;
  postId: string;
};
export const Comment = (props: CommentProps) => {
  const { data: profile } = useGetProfile();
  const [comment, setComment] = useState("");
  const textField = useRef(null);
  useEffect(() => {
    if (props.parentCommentUserName !== "") {
      setComment("@" + props.parentCommentUserName + " ");
      textField.current ? (textField.current as HTMLElement).focus() : () => {};
    } else {
      setComment("");
    }
  }, [props]);
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
          ref={textField}
          autoFocus
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
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              if (comment.includes(`@${props.parentCommentUserName}`)) {
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
              setComment("");
            }
          }}
        />
        <img
          src={send}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            console.log(comment);
            if (comment.includes(`@${props.parentCommentUserName}`)) {
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
            setComment("");
          }}
        />
      </div>
    </div>
  );
};

interface CommentsView {
  postId: string;
  setCommentProps: (props: CommentFieldProps) => void;
  className?: string;
}

const flattenComments = (data: CommentsArray | undefined) => {
  if (data === undefined) {
    return [];
  }
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
export const ViewComments = ({
  postId,
  setCommentProps,
  className,
}: CommentsView) => {
  const { mutate } = useLikeComment({ postId });
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetComments({ postId, limit: 1 });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [
    data,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);
  return (
    <div
      className={clsx(
        "flex w-full flex-col items-center gap-10 overflow-y-scroll",
        className,
      )}
    >
      {flattenComments(
        data?.pages.reduce<CommentDto[]>(
          (prev, curr) => prev.concat(curr.comments),
          [],
        ),
      ).map((comment) => {
        return (
          <div className="flex w-full">
            <span
              className={clsx({ "w-12": comment.parentCommentId !== "" })}
            />

            <div
              className={clsx("flex w-full flex-col justify-between gap-3")}
              key={comment._id}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-l font-bold">{comment.userName}</span>
                  <small className="text-xs">
                    {getTimeDifference(
                      new Date(),
                      new Date(comment.creationDate),
                    )}
                  </small>
                </div>
                <div className="flex items-center gap-2 justify-self-end">
                  <div className="flex items-center gap-1">
                    <span>{comment.likesCount}</span>
                    <Like
                      defaultValue={comment.isLiked}
                      isLiked={undefined}
                      onClick={() => {
                        mutate({
                          commentId: comment._id,
                          isLike: !comment.isLiked,
                        });
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
      })}
      <div>
        <Loading
          isLoading={isFetching || isFetchingNextPage}
          className="self-center"
          ref={ref}
        />
      </div>
    </div>
  );
};

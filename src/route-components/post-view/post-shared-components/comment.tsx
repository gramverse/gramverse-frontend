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
  CommentDto,
  CommentFieldProps,
  CommentsArray,
  SingleComment,
} from "../../../common/types/comment";
import { InputField } from "../../../reusable-components/input-field";
import { RoundPicture } from "../../../reusable-components/profile-picture";
import { Like } from "../../../route-components/post-view/post-shared-components/like";
import { getTimeDifference } from "../../../utilitis.ts/time-difference";
import { Button } from "../../../reusable-components/button";
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
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              console.log("enter");
              if (comment.includes(`@${props.parentCommentUserName}}`)) {
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
            if (comment.includes(`@${props.parentCommentUserName}}`)) {
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
  setCommentProps: React.Dispatch<React.SetStateAction<CommentFieldProps>>;
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
export const ViewComments = ({ postId, setCommentProps }: CommentsView) => {
  const { mutate } = useLikeComment({ postId });
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetComments({ postId });
  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching, isFetchingNextPage]);
  return (
    <div className="h-[200px] overflow-scroll">
      {flattenComments(
        data?.pages.reduce<CommentDto[]>(
          (prev, curr) => prev.concat(curr.comments),
          [],
        ),
      ).map((comment) => {
        return (
          <div
            className={clsx("mb-2 flex w-full flex-col justify-between gap-3", {
              "ms-5": comment.parentCommentId === "",
            })}
          >
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
        <Loading isLoading={isFetching} ref={ref} />
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

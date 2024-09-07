import { useGetComments } from "../../../api-hooks/comment";
import {
  CommentDto,
  CommentFieldProps,
  CommentsArray,
  SingleComment,
} from "../../../common/types/comment";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { Loading } from "../../../reusable-components/loading";
import { useEffect } from "react";
import { Comment } from "./comment";
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
        "flex flex-col items-center gap-10 overflow-y-scroll",
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
          <Comment
            commentKey={comment._id}
            comment={comment}
            postId={postId}
            setCommentProps={setCommentProps}
          />
        );
      })}
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        className="self-center"
        ref={ref}
      />
    </div>
  );
};

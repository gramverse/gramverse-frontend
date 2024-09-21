import { useCallback, useEffect, useRef, useState } from "react";
import { useSendComment } from "../../../services/comment";
import send from "@asset/svg/letter.svg";
import { InputField } from "../../../components/input-field";
import clsx from "clsx";
import { ProfileSummary } from "../../../components/profile-summary";

type CommentProps = {
  parentCommentId: string;
  parentCommentUserName: string;
  postId: string;
  className?: string;
};
export const AddComment = (props: CommentProps) => {
  const [comment, setComment] = useState("");
  const [parent, setParent] = useState("");
  const textField = useRef(null);
  useEffect(() => {
    if (props.parentCommentUserName !== "") {
      setParent(props.parentCommentUserName);
      textField.current ? (textField.current as HTMLElement).focus() : () => {};
    } else {
      setComment("");
    }
  }, [props.parentCommentUserName]);
  const { mutate } = useSendComment(props.postId);

  const SubmitComment = useCallback(() => {
    if (parent !== "") {
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
  }, [comment, mutate, parent, props.parentCommentId, props.postId]);
  return (
    <div>
      <div
        className={clsx("flex items-center justify-around", props.className)}
      >
        <ProfileSummary hasUserName={false} size={"small"} />
        <div className="relative flex flex-col items-start gap-3">
          <InputField
            maxLength={50}
            ref={textField}
            autoFocus
            id="addComment"
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
                SubmitComment();
              }
            }}
          />
          {parent !== "" && (
            <div className="absolute bottom-8 left-2 h-10">
              <span
                className="absolute -left-1 -top-3 z-10 flex h-4 w-4 cursor-pointer items-baseline justify-center rounded-full border border-solid border-gray-600 bg-white text-xs"
                onClick={() => setParent("")}
              >
                x
              </span>
              <span className="rounded-md border border-solid border-red-500 bg-red-300 p-1 text-xs">
                {parent}
              </span>
            </div>
          )}
        </div>
        <img
          src={send}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            setParent("");
            SubmitComment();
          }}
        />
      </div>
    </div>
  );
};

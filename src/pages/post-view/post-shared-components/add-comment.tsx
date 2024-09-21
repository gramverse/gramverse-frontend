import { useCallback, useEffect, useRef, useState } from "react";
import { useSendComment } from "../../../services/comment";
import { useGetProfile } from "../../../services/get-my-profile";
import send from "@asset/svg/letter.svg";
import person from "@asset/svg/profile.svg";

import { InputField } from "../../../components/input-field";
import { RoundPicture } from "../../../components/round-picture";
import clsx from "clsx";

type CommentProps = {
  parentCommentId: string;
  parentCommentUserName: string;
  postId: string;
  className?: string;
};
export const AddComment = (props: CommentProps) => {
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

  const SubmitComment = useCallback(() => {
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
  }, [
    comment,
    mutate,
    props.parentCommentId,
    props.parentCommentUserName,
    props.postId,
  ]);
  return (
    <div>
      <div
        className={clsx("flex items-center justify-around", props.className)}
      >
        <RoundPicture
          size="small"
          picture={
            profile?.profileImage && profile.profileImage !== ""
              ? profile.profileImage
              : person
          }
        />
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
        <img
          src={send}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            SubmitComment();
          }}
        />
      </div>
    </div>
  );
};

import { useCallback, useEffect, useRef, useState } from "react";
import { useSendComment } from "../../../api-hooks/comment";
import { useGetProfile } from "../../../api-hooks/get-my-profile";
import send from "../../../assets/svg/letter.svg";
import person from "../../../assets/svg/profile.svg";

import { InputField } from "../../../reusable-components/input-field";
import { RoundPicture } from "../../../reusable-components/round-picture";

type CommentProps = {
  parentCommentId: string;
  parentCommentUserName: string;
  postId: string;
};
export const Comments = (props: CommentProps) => {
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

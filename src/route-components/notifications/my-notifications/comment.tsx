import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../../api-hooks/get-my-profile";
import { comment } from "../../../common/types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../reusable-components/round-picture";
import { useId } from "react";

export const Comment = (props: comment) => {
  const { postImage, performerUserName, creationDate, postId, seen, comment } =
    props;
  const { data } = useGetProfile();
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex w-full items-center gap-5 rounded-2xl py-2",
        seen && "bg-primary",
        !seen && "bg-purple-200",
      )}
      key={useId()}
    >
      <RoundPicture
        size="medium"
        picture={postImage}
        onClick={() => {
          navigate(`/${data?.userName}/post/${postId}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        <p className="m-0 p-0">{`${performerUserName} واسه این پستت کامنت گذاشته`}</p>
        <small className="text-xs text-gray-500">{comment}</small>
        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
    </div>
  );
};

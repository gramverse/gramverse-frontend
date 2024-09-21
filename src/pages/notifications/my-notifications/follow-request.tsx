import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { FollowRequest as FollowRequestType } from "../../../types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../components/round-picture";
import { Button } from "../../../components/button";
import { useCallback } from "react";
import { useAcceptRequest } from "../../../services/notifications";

export const FollowRequest = (props: FollowRequestType) => {
  const { performerUserName, creationDate, seen, profileImage } = props;
  const navigate = useNavigate();
  const { mutate: accept, isPending } = useAcceptRequest();
  const CreateButton = useCallback(() => {
    return (
      <div className="flex gap-2">
        <Button
          isPending={isPending}
          onClick={() => {
            accept({ followerUserName: performerUserName, accepted: true });
          }}
        >
          قبوله
        </Button>
        <Button
          btnColor="outline"
          isPending={isPending}
          onClick={() => {
            accept({ followerUserName: performerUserName, accepted: false });
          }}
        >
          خوشم نمیاد ازش
        </Button>
      </div>
    );
  }, [accept, performerUserName]);
  return (
    <div
      className={clsx(
        "flex w-full items-center gap-5 rounded-2xl py-2",
        seen && "bg-primary",
        !seen && "bg-purple-200",
      )}
    >
      <RoundPicture
        size="large"
        picture={profileImage}
        onClick={() => {
          navigate(`/${performerUserName}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        <p className="m-0 p-0">{`${performerUserName} بهت درخواست دوستی داده`}</p>

        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
      {CreateButton()}
    </div>
  );
};

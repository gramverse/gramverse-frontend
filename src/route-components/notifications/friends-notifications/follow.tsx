import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { userFollow } from "../../../common/types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../reusable-components/round-picture";
import profile from "../../../assets/svg/profile.svg";
import { Button } from "../../../reusable-components/button";
import { useFollowUser, useGetUserProfile } from "../../../api-hooks/user-page";
import { useCallback, useId } from "react";

interface FollowProps extends userFollow {
  refetch: () => void;
}
export const Follow = (props: FollowProps) => {
  const { followingUserName, creationDate, seen, performerUserName } = props;
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfile(followingUserName);
  const { mutate: follow, isPending } = useFollowUser(followingUserName);
  const CreateButton = useCallback(() => {
    switch (userProfile?.followRequestState) {
      case "accepted":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              follow();
            }}
            isPending={isPending}
          >
            {"دنبال نکردن"}
          </Button>
        );
      case "pending":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              follow();
            }}
            isPending={isPending}
          >
            {"لغو درخواست"}
          </Button>
        );

      case "none" || "declined":
        return (
          <Button
            onClick={() => {
              follow();
            }}
          >
            {"دنبال کردن +"}
          </Button>
        );
    }
  }, [follow, isPending, userProfile?.followRequestState]);
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
        picture={
          userProfile?.profileImage && userProfile?.profileImage !== ""
            ? userProfile?.profileImage
            : profile
        }
        onClick={() => {
          navigate(`/${followingUserName}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        <p className="m-0 p-0">{`${followingUserName} ,${performerUserName} رو دنبال کرد`}</p>

        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
      {CreateButton()}
    </div>
  );
};

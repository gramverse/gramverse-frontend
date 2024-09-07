import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { followRequest } from "../../../common/types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../reusable-components/round-picture";
import profile from "../../../assets/svg/profile.svg";
import { Button } from "../../../reusable-components/button";
import { useFollowUser, useGetUserProfile } from "../../../api-hooks/user-page";
import { useCallback, useId } from "react";
import { useAcceptRequest } from "../../../api-hooks/notifications";

interface FollowProps extends followRequest {
  refetch: () => void;
}
export const FollowRequest = (props: FollowProps) => {
  const { performerUserName, creationDate, seen } = props;
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfile(performerUserName);
  const { mutate: follow, isPending } = useFollowUser(performerUserName);
  const { mutate: accept } = useAcceptRequest();
  const CreateButton = useCallback(() => {
    if (userProfile?.requestState === "accepted") {
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
              isPending={isPending}
            >
              {"دنبال کردن +"}
            </Button>
          );
      }
    } else if (userProfile?.requestState === "pending") {
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              accept({ followerUserName: performerUserName, accepted: true });
            }}
          >
            قبوله
          </Button>
          <Button
            btnColor="outline"
            onClick={() => {
              accept({ followerUserName: performerUserName, accepted: false });
            }}
          >
            خوشم نمیاد ازش
          </Button>
        </div>
      );
    }
  }, [
    userProfile?.requestState,
    userProfile?.followRequestState,
    isPending,
    follow,
    accept,
    performerUserName,
  ]);
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
          navigate(`/${performerUserName}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        {userProfile?.requestState === "pending" && (
          <p className="m-0 p-0">{`${performerUserName} بهت درخواست دوستی داده`}</p>
        )}
        {userProfile?.requestState === "accepted" && (
          <p className="m-0 p-0">{`${performerUserName} دنبالت کرد`}</p>
        )}

        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
      {CreateButton()}
    </div>
  );
};

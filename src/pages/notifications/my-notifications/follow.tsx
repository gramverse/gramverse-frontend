import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Follow as FollowType } from "../../../types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../components/round-picture";
import { Button } from "../../../components/button";
import { useFollowUser, useGetUserProfile } from "../../../services/user-page";
import { useCallback, useContext, useState } from "react";
import { UserNameContext } from "../../../router/Router";

export const Follow = (props: FollowType) => {
  const {
    performerUserName,
    creationDate,
    seen,
    profileImage,
    followRequestState,
  } = props;
  const [selectedUserName, setSelectedUserName] = useState("");
  const navigate = useNavigate();
  const myUserName = useContext(UserNameContext);

  const { userProfile, isRefetching } = useGetUserProfile(selectedUserName);
  const { mutate: follow, isPending } = useFollowUser(
    performerUserName,
    myUserName,
    userProfile?.followRequestState ?? followRequestState,
  );
  const CreateButton = useCallback(() => {
    switch (userProfile?.followRequestState ?? followRequestState) {
      case "accepted":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              setSelectedUserName(performerUserName);
              follow();
            }}
            classes="text-xs text-nowrap text-right"
            isPending={isPending || isRefetching}
          >
            {"دنبال نکردن"}
          </Button>
        );
      case "pending":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              setSelectedUserName(performerUserName);
              follow();
            }}
            isPending={isPending || isRefetching}
            classes="text-xs text-nowrap text-right"
          >
            {"لغو درخواست"}
          </Button>
        );

      case "none" || "declined":
        return (
          <Button
            onClick={() => {
              setSelectedUserName(performerUserName);
              follow();
            }}
            isPending={isPending || isRefetching}
            classes="text-xs text-nowrap text-right"
          >
            {"دنبال کردن +"}
          </Button>
        );
    }
  }, [
    userProfile?.followRequestState,
    followRequestState,
    isPending,
    isRefetching,
    performerUserName,
    follow,
  ]);
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
        <p className="m-0 p-0">{`${performerUserName} دنبالت کرد`}</p>

        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
      {CreateButton()}
    </div>
  );
};

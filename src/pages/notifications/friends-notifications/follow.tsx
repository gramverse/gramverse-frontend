import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { UserFollow } from "../../../types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../components/round-picture";
import { Button } from "../../../components/button";
import { useFollowUser } from "../../../services/user-page";
import { useCallback, useContext, useEffect } from "react";
import { UserNameContext } from "../../../router/Router";
import { useBlockUser } from "../../../services/users";

interface FollowProps extends UserFollow {
  refetch: () => void;
  isRefetching: boolean;
}
export const Follow = (props: FollowProps) => {
  const {
    followingUserName,
    creationDate,
    seen,
    performerUserName,
    profileImage,
    isBlocked,
    followRequestState,
    refetch,
  } = props;
  const navigate = useNavigate();
  const myUserName = useContext(UserNameContext);
  const {
    mutate: follow,
    isPending,
    isSuccess: isFollowSucess,
  } = useFollowUser(followingUserName, myUserName, followRequestState);
  const {
    mutate: block,
    isPending: isBlockPending,
    isSuccess: isBlockSuccess,
  } = useBlockUser();
  useEffect(() => {
    if (isFollowSucess) {
      refetch();
    }
    if (isBlockSuccess) {
      refetch();
    }
  }, [isBlockSuccess, isFollowSucess, refetch]);
  const CreateButton = useCallback(() => {
    if (!isBlocked) {
      switch (followRequestState) {
        case "accepted":
          return (
            <Button
              btnColor="outline"
              onClick={() => {
                follow();
              }}
              isPending={isPending}
              classes="text-xs text-nowrap text-right"
            >
              {"دنبال نکردن"}
            </Button>
          );
        case "pending":
          return (
            <Button
              btnColor="outline"
              classes="text-xs text-nowrap text-right"
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
              isPending={isPending}
              onClick={() => {
                follow();
              }}
              classes="text-xs text-nowrap text-right"
            >
              {"دنبال کردن +"}
            </Button>
          );
      }
    } else {
      return (
        <Button
          btnColor="outline"
          onClick={() => {
            block({ followingUserName, isBlock: !isBlocked });
          }}
          isPending={isBlockPending}
          classes="text-xs text-nowrap text-right"
        >
          {"آنبلاک کردن"}
        </Button>
      );
    }
  }, [
    block,
    follow,
    followRequestState,
    followingUserName,
    isBlockPending,
    isBlocked,
    isPending,
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

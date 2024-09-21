import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Follow } from "../../../types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../components/round-picture";
import profile from "@asset/svg/profile.svg";
import { Button } from "../../../components/button";
import { useFollowUser, useGetUserProfile } from "../../../services/user-page";
import { useCallback } from "react";
import { useAcceptRequest } from "../../../services/notifications";

export const AcceptRequest = (props: Follow) => {
  const { performerUserName, followingUserName, creationDate, seen } = props;
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfile(followingUserName);
  const { mutate: follow, isPending } = useFollowUser(followingUserName);
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
              classes="text-xs text-nowrap text-right"
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
              classes="text-xs text-nowrap text-right"
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
              classes="text-xs text-nowrap text-right"
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
              accept({ followerUserName: followingUserName, accepted: true });
            }}
            classes="text-xs text-nowrap text-right"
          >
            قبوله
          </Button>
          <Button
            btnColor="outline"
            onClick={() => {
              accept({ followerUserName: followingUserName, accepted: false });
            }}
            classes="text-xs text-nowrap text-right"
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
    followingUserName,
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
        <p className="m-0 p-0">{`${followingUserName} درخواست دوستیت رو قبول کرد `}</p>

        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
      {CreateButton()}
    </div>
  );
};

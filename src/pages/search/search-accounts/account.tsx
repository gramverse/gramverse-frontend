import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { useFollowUser, useGetUserProfile } from "../../../services/user-page";
import { useCallback, useState } from "react";
import { Account } from "../../../types/search";
import { UserProfileSummary } from "../../../components/user-profile-summary";

export const SearchedAccount = (props: Account) => {
  const {
    userName,
    followerCount,
    profileImage,
    followState: followRequestState,
  } = props;
  const [selectedUserName, setSelectedUserName] = useState("");
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfile(selectedUserName);
  const { mutate: follow, isPending } = useFollowUser(userName);

  const CreateButton = useCallback(() => {
    switch (userProfile?.followRequestState ?? followRequestState) {
      case "accepted":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              setSelectedUserName(userName);
              follow();
            }}
            isPending={isPending}
            className="w-full"
          >
            {"دنبال نکردن"}
          </Button>
        );
      case "pending":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              setSelectedUserName(userName);
              follow();
            }}
            isPending={isPending}
            className="w-full"
          >
            {"لغو درخواست"}
          </Button>
        );

      case "none" || "declined":
        return (
          <Button
            onClick={() => {
              setSelectedUserName(userName);
              follow();
            }}
            isPending={isPending}
            className="w-full"
          >
            {"دنبال کردن +"}
          </Button>
        );
    }
  }, [
    userProfile?.followRequestState,
    followRequestState,
    isPending,
    userName,
    follow,
  ]);
  return (
    <div
      className={clsx(
        "flex w-72 flex-col items-start gap-5 rounded-3xl border border-solid border-gray-300 bg-white px-4 py-2",
      )}
    >
      <UserProfileSummary
        followerCount={followerCount}
        userName={userName}
        profilePicture={profileImage}
        onClick={() => {
          navigate(`/${userName}`);
        }}
      />
      {CreateButton()}
    </div>
  );
};

export const SearchedAccountMobile = (props: Account) => {
  const {
    userName,
    followerCount,
    profileImage,
    followState: followRequestState,
  } = props;
  const [selectedUserName, setSelectedUserName] = useState("");
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfile(selectedUserName);
  const { mutate: follow, isPending } = useFollowUser(userName);
  const CreateButton = useCallback(() => {
    switch (userProfile?.followRequestState ?? followRequestState) {
      case "accepted":
        return (
          <Button
            btnColor="outline"
            onClick={() => {
              setSelectedUserName(userName);
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
              setSelectedUserName(userName);
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
              setSelectedUserName(userName);
              follow();
            }}
            isPending={isPending}
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
    userName,
    follow,
  ]);
  return (
    <div className={clsx("flex w-full items-center justify-between py-2")}>
      <UserProfileSummary
        followerCount={followerCount}
        userName={userName}
        profilePicture={profileImage}
        onClick={() => {
          navigate(`/${userName}`);
        }}
      />
      {CreateButton()}
    </div>
  );
};

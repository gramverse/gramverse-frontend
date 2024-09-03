import { useEffect, useState } from "react";
import { useGetFollowingerList } from "../../api-hooks/get-followinger-info";
import { useInView } from "react-intersection-observer";
import { FollowingersInfo, FollowingersInfoMobile } from "./followinger-info";
import clsx from "clsx";
import { Button } from "../../reusable-components/button";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "../../common/types/profile-data";

type FollowerListProps = {
  close: () => void;
  userName: string;
};

export const FollowerList = ({ userName, close }: FollowerListProps) => {
  const queryClient = useQueryClient();
  const myProfile = ProfileSchema.parse(
    queryClient.getQueryData(["getProfile"]),
  );
  const activityPermit = myProfile?.userName == userName ?? false;

  const [nearEndRef, isNearEnd] = useInView();
  const limit = 6;
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetFollowingerList(userName, false, limit);

  if (isError) {
    //for test
    console.log(error);
  }

  useEffect(() => {
    if (!hasNextPage || !isNearEnd || isFetching) return;
    fetchNextPage();
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);

  const followers = data?.pages.flatMap((x) => x.followingers) ?? [];
  const [selectedUser, setSelectedUser] = useState("");
  return (
    <div className="flex h-[42rem] w-[24rem] flex-col items-center justify-center bg-primary px-16">
      <p className="mb-8 mt-0 text-center text-xl font-bold">
        {"دنبال‌کننده‌ها"}
      </p>
      <div className="h-[25.75rem] w-[23.75rem] overflow-y-scroll">
        {followers.map((follower) => (
          <FollowingersInfo
            selectedUser={selectedUser}
            setUser={(user: string) => setSelectedUser(user)}
            follower={true}
            activityPermit={activityPermit}
            close={() => {
              close();
            }}
            key={follower.userName}
            userName={follower.userName}
            followerCount={follower.followerCount}
            profileImage={follower.profileImage}
          />
        ))}
        <div
          ref={nearEndRef}
          className={clsx(
            "flex w-full items-center justify-center text-2xl",
            hasNextPage ? "h-[calc(11rem/3)]" : "",
          )}
        >
          {hasNextPage && isFetchingNextPage && <div>Loading...</div>}
        </div>
      </div>
      <div className="mt-9 flex w-full flex-row justify-end">
        <Button
          btnColor="secondary"
          type="button"
          onClick={() => {
            close();
          }}
        >
          بستن
        </Button>
      </div>
    </div>
  );
};

export const FollowerListMobile = () => {
  const { userName: myUserName } = useParams();
  const queryClient = useQueryClient();
  const myProfile = ProfileSchema.parse(
    queryClient.getQueryData(["getProfile"]),
  );
  const activityPermit = myProfile?.userName == myUserName ?? false;

  const [nearEndRef, isNearEnd] = useInView();
  const limit = 6;
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetFollowingerList(myUserName ?? "", false, limit);

  if (isError) {
    //for test
    console.log(error);
  }

  useEffect(() => {
    if (!hasNextPage || !isNearEnd || isFetching) return;
    fetchNextPage();
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);

  const followers = data?.pages.flatMap((x) => x.followingers) ?? [];
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="flex h-3/4 w-fit flex-col items-start justify-start bg-primary">
      <p className="mb-2 mt-0 text-center text-xl font-bold">
        {"دنبال‌کننده‌ها"}
      </p>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-full w-full overflow-y-scroll">
          {followers.map((follower) => (
            <FollowingersInfoMobile
              selectedUser={selectedUser}
              setUser={(user: string) => setSelectedUser(user)}
              follower={true}
              activityPermit={activityPermit}
              key={follower.userName}
              userName={follower.userName}
              myUserName={myUserName}
              followerCount={follower.followerCount}
              profileImage={follower.profileImage}
            />
          ))}
          <div
            ref={nearEndRef}
            className={clsx(
              "flex w-full items-center justify-center text-2xl",
              hasNextPage ? "h-[calc(11rem/3)]" : "",
            )}
          >
            {hasNextPage && isFetchingNextPage && <div>Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

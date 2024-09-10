import { useEffect, useState } from "react";
import { useGetFollowingerList } from "../../services/get-followinger-info";
import { useInView } from "react-intersection-observer";
import { FollowingersInfo, FollowingersInfoMobile } from "./followinger-info";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "../../types/profile-data";
import { Loading } from "../../components/loading";

type FollowerListProps = {
  close: () => void;
  userName: string;
};

export const FollowerList = ({ userName, close }: FollowerListProps) => {
  const queryClient = useQueryClient();
  const myProfile = ProfileSchema.parse(
    queryClient.getQueryData(["getProfile"]),
  );
  const activityPermit = myProfile?.userName === userName;
  const [nearEndRef, isNearEnd] = useInView();
  const limit = 6;
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage
  } = useGetFollowingerList(userName, false, limit);

  useEffect(() => {
    if (hasNextPage && isNearEnd && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);

  const followers = data?.pages.flatMap((x) => x.followingers) ?? [];
  const [selectedUser, setSelectedUser] = useState("");
  return (
    <div className="flex h-[42rem] w-[24rem] flex-col items-center justify-center bg-primary px-16">
      <p className="mb-8 mt-0 text-center text-xl font-bold">
        {"دنبال‌کننده‌ها"}
      </p>
      <div className="flex h-[25.75rem] w-[23.75rem] flex-col items-center overflow-y-scroll">
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
        <Loading
          isLoading={isFetching || isFetchingNextPage}
          className="mt-4 self-center"
          ref={nearEndRef}
        />
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
  const activityPermit = myProfile?.userName === myUserName;
  const [nearEndRef, isNearEnd] = useInView();
  const limit = 6;
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetFollowingerList(myUserName ?? "", false, limit);

  useEffect(() => {
    if (hasNextPage && isNearEnd && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);

  const followers = data?.pages.flatMap((x) => x.followingers) ?? [];
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="flex h-3/4 w-fit flex-col items-start justify-start bg-primary">
      <p className="mb-2 mt-0 text-center text-xl font-bold">
        {"دنبال‌کننده‌ها"}
      </p>
      <div className="flex h-full w-full flex-col justify-start overflow-y-scroll">
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
        <Loading
          isLoading={isFetching || isFetchingNextPage}
          className="mt-4 self-center"
          ref={nearEndRef}
        />
      </div>
    </div>
  );
};

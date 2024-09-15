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

export const FollowingList = ({ userName, close }: FollowerListProps) => {
  const queryClient = useQueryClient();
  const myProfile = ProfileSchema.parse(
    queryClient.getQueryData(["getProfile"]),
  );
  const activityPermit = myProfile?.userName === userName;
  const [nearEndRef, isNearEnd] = useInView();
  const limit = 6;
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useGetFollowingerList(userName, true, limit);

  useEffect(() => {
    if (hasNextPage && isNearEnd && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);
  const [selectedUser, setSelectedUser] = useState("");

  const followings = data?.pages.flatMap((x) => x.followingers) ?? [];
  return (
    <div className="flex h-[42rem] w-[24rem] flex-col items-center justify-center bg-primary px-16">
      <p className="mb-8 mt-0 text-center text-xl font-bold">
        {"دنبال‌شونده‌ها"}
      </p>
      <div className="flex h-[25.75rem] w-[23.75rem] flex-col items-center overflow-y-scroll">
        {followings.map((following) => (
          <FollowingersInfo
            selectedUser={selectedUser}
            setUser={(user: string) => setSelectedUser(user)}
            close={() => {
              close();
            }}
            follower={false}
            activityPermit={activityPermit}
            key={following.userName}
            userName={following.userName}
            myUserName={userName}
            followerCount={following.followerCount}
            profileImage={following.profileImage}
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

export const FollowingListMobile = () => {
  const { userName: myUserName } = useParams();
  if (!myUserName) return;
  const queryClient = useQueryClient();
  const myProfile = ProfileSchema.parse(
    queryClient.getQueryData(["getProfile"]),
  );
  const activityPermit = myProfile?.userName === myUserName;
  const [nearEndRef, isNearEnd] = useInView();
  const limit = 6;
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useGetFollowingerList(myUserName ?? "", true, limit);

  useEffect(() => {
    if (hasNextPage && isNearEnd && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);
  const [selectedUser, setSelectedUser] = useState("");

  const followings = data?.pages.flatMap((x) => x.followingers) ?? [];
  return (
    <div className="flex h-3/4 w-fit flex-col items-start justify-start bg-primary">
      <p className="mb-2 mt-0 text-center text-xl font-bold">
        {"دنبال‌شونده‌ها"}
      </p>
      <div className="flex h-full w-full flex-col items-center justify-start overflow-y-scroll">
        {followings.map((following) => (
          <FollowingersInfoMobile
            selectedUser={selectedUser}
            setUser={(user: string) => setSelectedUser(user)}
            follower={false}
            activityPermit={activityPermit}
            key={following.userName}
            userName={following.userName}
            myUserName={myUserName}
            followerCount={following.followerCount}
            profileImage={following.profileImage}
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

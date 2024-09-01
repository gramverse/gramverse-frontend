import { useEffect, useState } from "react";
import { useGetFollowingerList } from "../../api-hooks/get-followinger-info";
import { useInView } from "react-intersection-observer";
import { FollowingersInfo } from "./followinger-info";
import clsx from "clsx";
import { Button } from "../../reusable-components/button";
import { useParams } from "react-router-dom";

type FollowerListProps = {
  close: () => void;
  userName: string;
};

export const FollowingList = ({ userName, close }: FollowerListProps) => {
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
  } = useGetFollowingerList(userName, true, limit);

  if (isError) {
    //for test
    console.log(error);
  }

  useEffect(() => {
    if (!hasNextPage || !isNearEnd || isFetching) return;
    fetchNextPage();
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);
  const [selectedUser, setSelectedUser] = useState("");

  const followings = data?.pages.flatMap((x) => x.followingers) ?? [];
  return (
    <div className="flex h-[42rem] w-[23.25rem] flex-col items-center justify-center bg-primary px-16">
      <p className="mb-8 mt-0 text-center text-xl font-bold">
        {"دنبال‌شونده‌ها"}
      </p>
      <div className="flex h-3/4 w-2/3 flex-col items-center justify-center">
        <div className="h-[25.75rem] w-[20.75rem] overflow-y-scroll">
          {followings.map((following) => (
            <FollowingersInfo
              selectedUser={selectedUser}
              setUser={(user: string) => setSelectedUser(user)}
              close={() => {
                close();
              }}
              follower={false}
              key={following.userName}
              userName={following.userName}
              followerCount={following.followerCount}
              profileImage={following.profileImage}
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
        <div className="flex w-full flex-row justify-end">
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
    </div>
  );
};

export const FollowingListMobile = () => {
  const { userName } = useParams();
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
  } = useGetFollowingerList(userName ?? "", true, limit);

  if (isError) {
    //for test
    console.log(error);
  }

  useEffect(() => {
    if (!hasNextPage || !isNearEnd || isFetching) return;
    fetchNextPage();
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);
  const [selectedUser, setSelectedUser] = useState("");

  const followings = data?.pages.flatMap((x) => x.followingers) ?? [];
  return (
    <div className="flex h-3/4 w-fit flex-col items-start justify-start bg-primary">
      <p className="mb-2 mt-0 text-center text-xl font-bold">
        {"دنبال‌شونده‌ها"}
      </p>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-full w-full overflow-y-scroll">
          {followings.map((following) => (
            <FollowingersInfo
              selectedUser={selectedUser}
              setUser={(user: string) => setSelectedUser(user)}
              follower={false}
              key={following.userName}
              userName={following.userName}
              followerCount={following.followerCount}
              profileImage={following.profileImage}
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

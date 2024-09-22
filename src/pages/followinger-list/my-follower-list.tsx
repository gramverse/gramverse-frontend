import { useContext, useEffect } from "react";
import { useGetFollowingerList } from "../../services/get-followinger-info";
import { useInView } from "react-intersection-observer";
import { FollowingersInfo } from "./followinger-info";
import { Button } from "../../components/button";
import { Loading } from "../../components/loading";
import { UserNameContext } from "../../router/Router";

type FollowerListProps = {
  close: () => void;
  userName: string;
  openChat: () => void;
  setSelectedUser: (arg: string) => void;
  selectedUser: string;
};

export const MyFollowerList = ({
  userName,
  close,
  openChat,
  selectedUser,
  setSelectedUser,
}: FollowerListProps) => {
  const myUserName = useContext(UserNameContext);
  const activityPermit = myUserName === userName;
  const { ref: nearEndRef, inView: isNearEnd } = useInView();
  const limit = 6;
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useGetFollowingerList(userName, false, limit);

  useEffect(() => {
    if (hasNextPage && isNearEnd && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isNearEnd, isFetchingNextPage, hasNextPage, isFetching, fetchNextPage]);

  const followers = data?.pages.flatMap((x) => x.followingers) ?? [];
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
            pageUserName={userName}
            followerCount={follower.followerCount}
            profileImage={follower.profileImage}
            openChat={openChat}
          />
        ))}
        <Loading
          isLoading={isFetching || isFetchingNextPage}
          className="my-4 self-center"
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

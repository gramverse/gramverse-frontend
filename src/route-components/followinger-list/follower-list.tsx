import { useEffect } from "react";
import { useGetFollowingerList } from "../../api-hooks/get-followinger-info";
import { useInView } from "react-intersection-observer";
import { FollowingersInfo } from "./followinger-info";
import clsx from "clsx";
import { Button } from "../../reusable-components/button";

type FollowerListProps = {
  close: () => void;
  userName: string;
};

export const FollowerList = ({ userName, close }: FollowerListProps) => {
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

  return (
    <div className="flex h-[42rem] w-[23.25rem] px-16 flex-col items-center justify-center bg-primary">
      <p className="text-center text-xl mt-0 mb-8 font-bold">{"دنبال‌کننده‌ها"}</p>
     <div className="h-3/4 w-2/3 flex flex-col items-center justify-center">
      <div className="h-[25.75rem] w-[20.75rem] overflow-y-scroll">
        {followers.map((follower) => (
          <FollowingersInfo
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
        <div className="w-full flex flex-row justify-end pt-9">
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

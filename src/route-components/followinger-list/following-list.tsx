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

  const followings = data?.pages.flatMap((x) => x.followingers) ?? [];

  return (
    <div className="flex h-[calc(200vh/3)] p-8 max-h-80 max-w-[60rem] flex-col items-center justify-center bg-primary">
      <p className="text-center text-xl mt-0 mb-8 font-bold">{"دنبال‌کننده‌ها"}</p>
      {/* <div className="h-[480px] w-[332px] overflow-y-scroll"> */}
      <div className="grow w-[40rem] overflow-y-scroll">
        {followings.map((following) => (
          <FollowingersInfo
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
            hasNextPage ? "h-[calc(11rem/3)]" : "", //check it!!!!!!!!!!!!!!!!
          )}
        >
          {hasNextPage && isFetchingNextPage && <div>Loading...</div>}
        </div>
        <div className="flex flex-row justify-end">
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

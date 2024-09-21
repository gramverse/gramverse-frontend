import { useCallback, useEffect } from "react";
import { useGetFollowingNotifications } from "../../../services/notifications";
import { Comment } from "../friends-notifications/comment";
import { Follow } from "../friends-notifications/follow";
import { Like } from "../friends-notifications/like";
import {
  UserComment,
  UserFollow,
  UserLike,
} from "../../../types/notifications";
import { useInView } from "react-intersection-observer";
import { Loading } from "../../../components/loading";
import { queryClient } from "../../../common/query-client";
import { nanoid } from "nanoid";

export const FriendsNotificationsLayout = () => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useGetFollowingNotifications({ limit: 10 });
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
  }
  const NotifComponent = useCallback(
    (notification: UserComment | UserLike | UserFollow) => {
      switch (notification.type) {
        case "like":
          return <Like {...notification} key={nanoid()} />;

        case "follow":
          return (
            <Follow
              refetch={() => {
                refetch();
              }}
              {...notification}
              key={nanoid()}
            />
          );

        case "comment":
          return <Comment {...notification} key={nanoid()} />;
      }
    },
    [refetch],
  );
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    data,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);
  return (
    <div className="flex w-full flex-col gap-2 text-right text-xs">
      {data?.pages
        .flatMap((chunck) => chunck.notifications)
        .map((notificiation) => NotifComponent(notificiation))}
      <Loading
        className="my-3"
        isLoading={isFetching || isFetchingNextPage}
        ref={ref}
      />
    </div>
  );
};

export const FriendsNotification = () => {
  return <FriendsNotificationsLayout />;
};

export const FriendsNotificationMobile = () => {
  return <FriendsNotificationsLayout />;
};

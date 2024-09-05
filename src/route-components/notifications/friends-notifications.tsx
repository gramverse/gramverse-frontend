import { useCallback, useEffect } from "react";
import { useGetFollowingNotifications } from "../../api-hooks/notifications";
import { Comment } from "./friends-notifications/comment";
import { Follow } from "./friends-notifications/follow";
import { Like } from "./friends-notifications/like";
import {
  userComment,
  userFollow,
  userLike,
} from "../../common/types/notifications";
import { useInView } from "react-intersection-observer";
import { Loading } from "../../reusable-components/loading";

export const FriendsNotificationsLayout = () => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetFollowingNotifications({ limit: 1 });
  const NotifComponent = useCallback(
    (notification: userComment | userLike | userFollow) => {
      switch (notification.type) {
        case "like":
          return <Like {...notification} />;

        case "follow":
          return (
            <Follow
              refetch={() => {
                refetch();
              }}
              {...notification}
            />
          );

        case "comment":
          return <Comment {...notification} />;
      }
    },
    [refetch],
  );
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
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
    <div className="flex w-full flex-col gap-2">
      {data?.pages
        .flatMap((chunck) => chunck.notifications)
        .map((notificiation) => NotifComponent(notificiation))}
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        className="self-start"
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

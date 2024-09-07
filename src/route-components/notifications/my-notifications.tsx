import { Like } from "./my-notifications/like";
import { Mention } from "./my-notifications/mention";
import { Comment } from "./my-notifications/comment";
import { Follow } from "./my-notifications/follow";
import { useGetMyNotifications } from "../../api-hooks/notifications";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect } from "react";
import {
  comment,
  follow,
  followRequest,
  like,
  mention,
} from "../../common/types/notifications";
import { Loading } from "../../reusable-components/loading";
import { FollowRequest } from "./my-notifications/follow-request";

export const MyNotificationsLayout = () => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetMyNotifications({ limit: 10 });
  const NotifComponent = useCallback(
    (notification: mention | like | follow | comment | followRequest) => {
      switch (notification.type) {
        case "mention":
          return <Mention {...notification} />;
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
        case "followRequest":
          return (
            <FollowRequest
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

export const MyNotifications = () => {
  return <MyNotificationsLayout />;
};

export const MyNotificationsMobile = () => {
  return <MyNotificationsLayout />;
};

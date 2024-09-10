import { Like } from "./my-notifications/like";
import { Mention } from "./my-notifications/mention";
import { Comment } from "./my-notifications/comment";
import { Follow } from "./my-notifications/follow";
import { useGetMyNotifications } from "../../services/notifications";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect } from "react";
import {
  comment,
  follow,
  followRequest,
  like,
  mention,
} from "../../types/notifications";
import { Loading } from "../../components/loading";
import { FollowRequest } from "./my-notifications/follow-request";
import { queryClient } from "../../common/query-client";

export const MyNotificationsLayout = () => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useGetMyNotifications({ limit: 1 });
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
  }
  const NotifComponent = useCallback(
    (notification: mention | like | follow | comment | followRequest) => {
      switch (notification.type) {
        case "mention":
          return (
            <Mention
              {...notification}
              key={notification.postId + notification.performerUserName}
            />
          );
        case "like":
          return (
            <Like
              {...notification}
              key={notification.postId + notification.performerUserName}
            />
          );

        case "follow":
          return (
            <Follow
              refetch={() => {
                refetch();
              }}
              {...notification}
              key={notification.performerUserName}
            />
          );
        case "followRequest":
          return (
            <FollowRequest
              refetch={() => {
                refetch();
              }}
              {...notification}
              key={
                notification.followingUserName + notification.performerUserName
              }
            />
          );
        case "comment":
          return (
            <Comment
              {...notification}
              key={
                notification.postId +
                notification.performerUserName +
                notification.creationDate
              }
            />
          );
      }
    },
    [refetch],
  );
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    data?.pages,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);
  return (
    <div className="flex w-full grow flex-col gap-2">
      {data?.pages
        .flatMap((chunck) => chunck.notifications)
        .map((notificiation) => NotifComponent(notificiation))}
      <Loading isLoading={isFetching || isFetchingNextPage} ref={ref} />
    </div>
  );
};

export const MyNotifications = () => {
  return <MyNotificationsLayout />;
};

export const MyNotificationsMobile = () => {
  return <MyNotificationsLayout />;
};

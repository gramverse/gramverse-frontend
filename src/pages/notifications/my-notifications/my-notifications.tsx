import { Like } from "../my-notifications/like";
import { Mention } from "../my-notifications/mention";
import { Comment } from "../my-notifications/comment";
import { Follow } from "../my-notifications/follow";
import { FollowRequest } from "../my-notifications/follow-request";
import { useGetMyNotifications } from "../../../services/notifications";
import { useInView } from "react-intersection-observer";
import { useCallback, useContext, useEffect } from "react";
import {
  Comment as CommentType,
  Follow as FollowType,
  FollowRequest as FollowRequestType,
  Like as LikeType,
  Mention as MentionType,
} from "../../../types/notifications";
import { Loading } from "../../../components/loading";
import { queryClient } from "../../../common/query-client";
import { nanoid } from "nanoid";
import { AcceptRequest } from "./accept-request";
import { UserNameContext } from "../../../router/Router";

export const MyNotificationsLayout = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useGetMyNotifications({ limit: 1 });
  useEffect(() => {
    if (isSuccess) {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
      }
    }
  }, [isSuccess]);
  const myUserName = useContext(UserNameContext);
  const NotifComponent = useCallback(
    (
      notification:
        | MentionType
        | LikeType
        | FollowType
        | CommentType
        | FollowRequestType,
    ) => {
      switch (notification.type) {
        case "mention":
          return <Mention {...notification} key={nanoid()} />;
        case "like":
          return <Like {...notification} key={nanoid()} />;

        case "follow":
          if (notification.performerUserName !== myUserName) {
            return <Follow {...notification} key={nanoid()} />;
          } else {
            return <AcceptRequest key={nanoid()} {...notification} />;
          }
        case "followRequest":
          return <FollowRequest {...notification} key={nanoid()} />;
        case "comment":
          return <Comment {...notification} key={nanoid()} />;
      }
    },
    [myUserName],
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
    <div className="flex w-full grow flex-col gap-2 text-right text-xs">
      {data?.pages
        .flatMap((chunck) => chunck.notifications)
        .map((notificiation) => NotifComponent(notificiation))}
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        className="my-3"
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

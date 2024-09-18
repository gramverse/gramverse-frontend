import { Like } from "../my-notifications/like";
import { Mention } from "../my-notifications/mention";
import { Comment } from "../my-notifications/comment";
import { Follow } from "../my-notifications/follow";
import { useGetMyNotifications } from "../../../services/notifications";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect } from "react";
import {
  comment,
  follow,
  followRequest,
  like,
  mention,
} from "../../../types/notifications";
import { Loading } from "../../../components/loading";
import { FollowRequest } from "../my-notifications/follow-request";
import { queryClient } from "../../../common/query-client";
import { nanoid } from "nanoid";
import { useGetProfile } from "../../../services/get-my-profile";
import { AcceptRequest } from "./accept-request";

export const MyNotificationsLayout = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useGetMyNotifications({ limit: 1 });
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
  }
  const { data: myProfile, isSuccess: profileSuccess } = useGetProfile();
  const NotifComponent = useCallback(
    (notification: mention | like | follow | comment | followRequest) => {
      if (profileSuccess) {
        switch (notification.type) {
          case "mention":
            return <Mention {...notification} key={nanoid()} />;
          case "like":
            return <Like {...notification} key={nanoid()} />;

          case "follow":
            if (notification.performerUserName !== myProfile.userName) {
              return <Follow {...notification} key={nanoid()} />;
            } else {
              return <AcceptRequest key={nanoid()} {...notification} />;
            }
          case "followRequest":
            return <FollowRequest {...notification} key={nanoid()} />;
          case "comment":
            return <Comment {...notification} key={nanoid()} />;
        }
      }
    },
    [myProfile?.userName, profileSuccess],
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

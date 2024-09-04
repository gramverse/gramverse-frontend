import { Mention } from "./my-notifications/mention";

export const FriendsNotificationsLayout = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Mention
        type={"mention"}
        userName={""}
        postId={""}
        postImage={""}
        seen={false}
        creationDate={""}
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

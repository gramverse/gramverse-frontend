import { Mention } from "./my-notifications/mention";

export const MyNotificationsLayout = () => {
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

export const MyNotifications = () => {
  return <MyNotificationsLayout />;
};

export const MyNotificationsMobile = () => {
  return <MyNotificationsLayout />;
};

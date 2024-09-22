import clsx from "clsx";
import { Chat } from "../../types/chat";
import { RoundPicture } from "../../components/round-picture";
import { getTimeDifference } from "../../common/utilities/time-difference";

interface ChatSummaryProps extends Chat {
  clickHandler: () => void;
}
export const ChatSummary = (props: ChatSummaryProps) => {
  const {
    profileImage,
    clickHandler,
    lastMessageTime: lastMessageDate,
    lastMessage,
    lastMessageType,
    userName,
    unreadCount,
  } = props;
  return (
    <div
      className={clsx(
        "flex w-full cursor-pointer items-center gap-5 rounded-2xl py-2",
      )}
      onClick={() => {
        clickHandler();
      }}
    >
      <RoundPicture size="large" picture={profileImage} />
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <p className="m-0 p-0">{`${userName}`}</p>
          <small className="text-xs text-gray-500">
            {getTimeDifference(new Date(), new Date(lastMessageDate))}
          </small>
        </div>
        <small className="text-xs text-gray-500">
          {lastMessageType === "text"
            ? lastMessage.length > 100
              ? lastMessage.slice(0, 100).concat("...")
              : lastMessage
            : "یک عکس فرستاده است"}
        </small>
      </div>
      {unreadCount > 0 && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-400 text-white">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

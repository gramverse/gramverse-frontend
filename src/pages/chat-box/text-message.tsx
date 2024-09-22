import { RoundPicture } from "../../components/round-picture";
import { ChatMessage } from "../../types/chat-box";
import PersonIcon from "../../assets/svg/profile.svg";
import clsx from "clsx";
import { formatDate } from "../../common/utilities/time-helper";
import { MarkSeenMessage } from "./mark-seen-message";
import { forwardRef, HTMLAttributes } from "react";

type MessageBoxProps = HTMLAttributes<HTMLDivElement> & {
  message: ChatMessage;
  isMine: boolean;
};

export const TextMessage = forwardRef<HTMLDivElement, MessageBoxProps>(
  function TextMessage({ message, isMine, className, ...attrs }, ref) {
    return (
      <div
        ref={ref}
        {...attrs}
        data-message-id={message.messageId}
        data-unseen={!message.seen}
        className={clsx("message flex w-[39.25rem] gap-1", className)}
      >
        <div
          className={clsx(
            "w-[14.68rem] rounded-b-[2rem] border bg-[#D8D8D8] px-8 py-4",
            isMine
              ? "ml-auto rounded-l-[2rem] bg-[#F6881F] text-white"
              : "mr-auto rounded-r-[2rem]",
          )}
        >
          {!isMine && (
            <p className="text-sm font-medium leading-5">{message.userName}</p>
          )}
          <p className="text-xs font-normal leading-5">
            {message.content.toString()}
          </p>
          <div className="flex">
            {/* {isMine && <img src={SeenIcon} className="mr-auto" />}MarkSeenMessage */}
            {isMine && (
              <MarkSeenMessage className="mr-auto" hasSeen={message.seen} />
            )}
            <p
              className={clsx(
                "w-20 text-left text-xs font-light text-[#666668]",
                //isMine ? "mr-auto" : "ml-auto",
                isMine ? "" : "ml-auto",
              )}
            >
              {formatDate(message.date)}
            </p>
          </div>
        </div>
        {!isMine && (
          <RoundPicture
            size="medium"
            classes="w-8 h-8"
            picture={
              message.profileImage && message.profileImage != ""
                ? message.profileImage
                : PersonIcon
            }
          />
        )}
      </div>
    );
  },
);

export const TextMessageMobile = forwardRef<HTMLDivElement, MessageBoxProps>(
  function TextMessage({ message, isMine }, ref) {
    return (
      <div
        ref={ref}
        data-message-id={message.messageId}
        data-unseen={!message.seen}
        className="message flex w-[19.43rem] gap-1"
      >
        <div
          className={clsx(
            "w-[10.31rem] rounded-b-[2rem] border bg-[#D8D8D8]",
            isMine
              ? "ml-auto rounded-l-[2rem] bg-[#F6881F] text-white"
              : "mr-auto rounded-r-[2rem]",
          )}
        >
          {!isMine && (
            <p className="text-sm font-medium leading-5">{message.userName}</p>
          )}
          <p className="text-xs font-normal leading-5">
            {message.content.toString()}
          </p>
          <div className="flex">
            {isMine && (
              <MarkSeenMessage className="mr-auto" hasSeen={message.seen} />
            )}
            <p
              className={clsx(
                "w-20 text-left text-xs font-light text-[#666668]",
                //isMine ? "mr-auto" : "ml-auto",
                isMine ? "" : "ml-auto",
              )}
            >
              {formatDate(message.date)}
            </p>
          </div>
        </div>
        {!isMine && (
          <RoundPicture
            size="medium"
            classes="w-8 h-8"
            picture={
              message.profileImage && message.profileImage != ""
                ? message.profileImage
                : PersonIcon
            }
          />
        )}
      </div>
    );
  },
);

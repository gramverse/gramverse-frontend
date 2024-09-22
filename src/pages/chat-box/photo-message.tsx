import { ChatMessage } from "../../types/chat-box";
import PersonIcon from "../../assets/svg/profile.svg";
import { RoundPicture } from "../../components/round-picture";
import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";

type MessageBoxProps = HTMLAttributes<HTMLDivElement> & {
  message: ChatMessage;
  isMine: boolean;
};

export const PhotoMessage = forwardRef<HTMLDivElement, MessageBoxProps>(
  function PhotoMessage({ message, isMine, className, ...attrs }, ref) {
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
            "post h-[14.62rem] w-[14.68rem] overflow-hidden rounded-b-lg border bg-[#D8D8D8]",
            isMine ? "ml-auto rounded-l-lg" : "mr-auto rounded-r-lg",
          )}
          //   onClick={onClick} open it in large scale
        >
          <img
            src={message.content}
            className="h-full w-full cursor-pointer object-cover"
          />
        </div>
        {!isMine && (
          <RoundPicture
            size="medium"
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

export const PhotoMessageMobile = forwardRef<HTMLDivElement, MessageBoxProps>(
  function PhotoMessage({ message, isMine, ...attrs }, ref) {
    return (
      <div
        ref={ref}
        {...attrs}
        data-message-id={message.messageId}
        data-unseen={!message.seen}
        className="message flex w-[39.25rem] gap-1"
      >
        <div
          className={clsx(
            "post h-[14.62rem] w-[10.25rem] overflow-hidden rounded-b-lg border bg-[#D8D8D8]",
            isMine ? "ml-auto rounded-l-lg" : "mr-auto rounded-r-lg",
          )}
          //   onClick={onClick} open it in large scale
        >
          <img
            src={message.content}
            className="h-full w-full cursor-pointer object-cover"
          />
        </div>
        {!isMine && (
          <RoundPicture
            size="medium"
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

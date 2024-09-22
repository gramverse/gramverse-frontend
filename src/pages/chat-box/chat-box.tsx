import { RoundPicture } from "../../components/round-picture";
import { PhotoMessage, PhotoMessageMobile } from "./photo-message";
import { TextMessage, TextMessageMobile } from "./text-message";
import PersonIcon from "../../assets/svg/profile.svg";
import Close from "../../assets/svg/close.svg";
import { useExchangeMessage } from "../../common/utilities/exchange-message";
import { useContext, useEffect } from "react";
import { useRef } from "react";
import { SendMessage, SendMessageMobile } from "./send-message";
import { isElementInCertainBox } from "../../common/utilities/is-element-visible";
import { useGetChatDetail } from "../../services/chat-box";
import { UserNameContext } from "../../router/Router";
import { useGetChatId } from "../../services/chat";
import { useNavigate, useParams } from "react-router-dom";
import back from "@asset/svg/back.svg";
import { Loading } from "../../components/loading";

type ChatBoxProps = {
  myUserName: string;
  chatId: string;
  close: () => void;
};
export const ChatBox = ({ myUserName, chatId }: ChatBoxProps) => {
  const { data: chatDetail } = useGetChatDetail(chatId);
  const chatScrollElementRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isLoading,
    existHistory,
    nearEndMessagesRef,
    sendMessage,
    seenMessage,
    lastMessageRef,
    socket,
  } = useExchangeMessage(
    chatDetail?.friendUserName ?? "",
    chatDetail?.totalCount ?? 0,
    chatId,
    chatDetail?.profileImage ?? "",
  );

  useEffect(() => {
    if (!messages) return;
    const syncSeen = (): void => {
      if (document.visibilityState === "hidden") return;

      const firstUnSeen = [...document.querySelectorAll("[data-unseen]")]
        .reverse()
        .find((x) => isElementInCertainBox(x, chatScrollElementRef.current));

      if (!firstUnSeen) return;

      const id = firstUnSeen.getAttribute("data-message-id");
      const messageIdx = messages.findIndex((msg) => msg.messageId === id);

      if (messageIdx === -1) return;

      const hasSeenIds: string[] = [];
      for (let i = messageIdx; i >= 0; i--) {
        const message = messages[i];
        if (message.seen || message.userName == myUserName) break;
        hasSeenIds.push(message.messageId);
      }
      if (hasSeenIds.length > 0)
        seenMessage(hasSeenIds, chatDetail?.friendUserName ?? "");
    };

    chatScrollElementRef.current?.addEventListener("scrollend", syncSeen);
    document.addEventListener("visibilitychange", syncSeen);
    return () => {
      chatScrollElementRef.current?.removeEventListener("scrollend", syncSeen);
      document.removeEventListener("visibilitychange", syncSeen);
    };
  }, [messages]);

  return (
    <>
      {!messages && <></>}
      {messages && (
        <div className="h-[51.42rem] w-[47.43rem] bg-primary px-4">
          <div className="mt-6 flex w-full">
            <div
              className="h-8 w-8 cursor-pointer"
              onClick={(e) => {
                console.log("sockettttt");
                socket?.disconnect();
                e.stopPropagation();
                close();
              }}
            >
              <img src={Close} />
            </div>
            <div className="mr-auto h-12 w-12">
              <RoundPicture
                onClick={() => {
                  console.log("sockettttt");
                  socket?.disconnect();
                }}
                size="medium"
                picture={chatDetail?.profileImage ?? PersonIcon}
              />
            </div>
          </div>
          <div
            ref={chatScrollElementRef}
            className="chat-box mt-8 box-border h-[41.17rem] w-[46.62rem] overflow-y-scroll px-8 py-4"
          >
            <div>
              {isLoading && existHistory ? (
                <div>Loading...</div>
              ) : (
                <div ref={nearEndMessagesRef}></div>
              )}
            </div>
            {messages.length == 0 && <div className="h-screen"></div>}

            {messages.map((message, idx) => {
              const Message =
                message.type == "text" ? TextMessage : PhotoMessage;
              const isLast = idx == messages.length - 1;
              const ref = isLast ? lastMessageRef : undefined;
              return (
                <Message
                  key={message.messageId}
                  ref={ref}
                  isMine={message.userName == myUserName}
                  message={message}
                  className="my-2"
                />
              );
            })}
          </div>
          <SendMessage
            onSendMessage={sendMessage}
            myUsername={myUserName}
            friendUsername={chatDetail?.friendUserName ?? ""}
          />
        </div>
      )}
    </>
  );
};

export const ChatBoxMobile = () => {
  const params = useParams();
  const myUserName = useContext(UserNameContext);
  const { data } = useGetChatId(params.userName ?? "");
  const { data: chatDetail } = useGetChatDetail(data?.chatId ?? "");
  const chatScrollElementRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isLoading,
    existHistory,
    nearEndMessagesRef,
    sendMessage,
    seenMessage,
    lastMessageRef,
  } = useExchangeMessage(
    chatDetail?.friendUserName ?? "",
    // chatDetail?.unreadCount ?? 0,
    chatDetail?.totalCount ?? 0,
    data?.chatId ?? "",
    chatDetail?.profileImage ?? "",
    //  chatScrollElementRef,
  );

  useEffect(() => {
    if (!messages) return;
    const syncSeen = (): void => {
      if (document.visibilityState === "hidden") return;

      const firstUnSeen = [...document.querySelectorAll("[data-unseen]")]
        .reverse()
        //.find(isElementInViewport);
        .find((x) => isElementInCertainBox(x, chatScrollElementRef.current));

      if (!firstUnSeen) return;

      const id = firstUnSeen.getAttribute("data-message-id");
      const messageIdx = messages.findIndex((msg) => msg.messageId === id);

      if (messageIdx === -1) return;

      const hasSeenIds: string[] = [];
      for (let i = messageIdx; i >= 0; i--) {
        const message = messages[i];
        if (message.seen || message.userName == myUserName) break;
        hasSeenIds.push(message.messageId);
      }
      if (hasSeenIds.length > 0)
        seenMessage(hasSeenIds, chatDetail?.friendUserName ?? "");
    };

    chatScrollElementRef.current?.addEventListener("scrollend", syncSeen);
    document.addEventListener("visibilitychange", syncSeen);
    return () => {
      chatScrollElementRef.current?.removeEventListener("scrollend", syncSeen);
      document.removeEventListener("visibilitychange", syncSeen);
    };
  }, [messages]);

  const focusElement = document.getElementById("lodaing");
  if (focusElement) {
    focusElement.focus();
  }
  const navigate = useNavigate();

  return (
    <>
      {!messages && <></>}
      {messages && (
        <div className="w-full overflow-x-hidden">
          <div className="mb-3">
            <img
              src={back}
              alt=""
              className="h-4 self-end p-2"
              onClick={() => {
                navigate(-1);
              }}
            />
            <div className="h-0 border border-solid border-gray-300 bg-gray-300" />
          </div>
          <div className="flex w-full">
            <div className="mr-auto h-12 w-12">
              <RoundPicture
                size="medium"
                picture={chatDetail?.profileImage ?? PersonIcon}
              />
            </div>
          </div>
          <div
            ref={chatScrollElementRef}
            className="chat-box mt-8 box-border flex h-[39rem] w-[46.62rem] flex-col gap-4 overflow-y-scroll px-8 py-4"
          >
            <Loading
              className="pt-60"
              ref={nearEndMessagesRef}
              isLoading={isLoading && existHistory}
            />
            {/* <div>
              <div ref={nearEndMessagesRef}></div>
              {isLoading && existHistory && <div>Loading...</div>}
              <div id="lodaing" className="pt-60"></div>
            </div> */}
            {messages.map((message, idx) => {
              const Message =
                message.type == "text" ? TextMessageMobile : PhotoMessageMobile;
              const isLast = idx == messages.length - 1;
              const ref = isLast ? lastMessageRef : undefined;
              return (
                <Message
                  key={message.messageId}
                  ref={ref}
                  isMine={message.userName == myUserName}
                  message={message}
                />
              );
            })}
          </div>
          <SendMessageMobile
            onSendMessage={sendMessage}
            myUsername={myUserName}
            friendUsername={chatDetail?.friendUserName ?? ""}
            // friendUsername={friendUserName}
          />
        </div>
      )}
    </>
  );
};

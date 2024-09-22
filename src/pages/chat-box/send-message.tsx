import { useEffect, useState } from "react";
import Emoji from "@asset/svg/emoji.svg";
import { EmojiKeyboard } from "../../components/emoji/emoji-keyboard";
import { InputField } from "../../components/input-field";
import send from "@asset/svg/letter.svg";
import { UploadPhoto } from "./upload-photo";
import Close from "@asset/svg/close.svg";
import clsx from "clsx";
import { MessageType } from "../../types/chat-box";

type SendMessageProps = {
  mobile?: boolean;
  myUsername: string;
  friendUsername: string;
  onSendMessage: (
    content: string,
    type: MessageType,
    myUserName: string,
  ) => void;
};

export const SendMessageLayout = ({
  mobile,
  myUsername,
  onSendMessage,
}: SendMessageProps) => {
  const [message, setMessage] = useState("");
  const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);
  const [photo, setPhoto] = useState<string>();
  useEffect(() => {
    if (photo) {
      setMessage("");
    }
  }, [photo]);
  return (
    <div
      className="relative m-auto flex h-10 w-fit items-center justify-center gap-2"
      onClick={() => {
        setKeyboardVisibility(false);
      }}
    >
      <EmojiKeyboard
        className="bottom-10 right-9"
        visibility={isKeyBoardVisible}
        setEmoji={(emoji) => {
          setMessage((message) => message.concat(emoji));
          setKeyboardVisibility(false);
        }}
      />
      {photo !== undefined && (
        <div
          className={clsx(
            "absolute bottom-10 right-9 items-center justify-center overflow-hidden rounded-t-2xl rounded-bl-2xl border-2 border-solid border-gray-400 bg-primary p-5 brightness-105 transition-all",
            mobile ? "h-56 w-56" : "h-72 w-72",
          )}
        >
          <img
            src={Close}
            className="absolute right-1 top-1 z-10 h-10 cursor-pointer"
            alt="remove selected photo"
            onClick={() => setPhoto(undefined)}
          />
          <img
            src={typeof photo === "string" ? photo : URL.createObjectURL(photo)}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      )}
      <img
        src={Emoji}
        alt="open emoji keyboard"
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setKeyboardVisibility((isKeyBoardVisible) => !isKeyBoardVisible);
        }}
      />
      <UploadPhoto setSelectedPhoto={(arg) => setPhoto(arg)} className="h-5" />
      <InputField
        id="caption"
        fieldsize={mobile ? "mobile" : "long"}
        autoFocus
        value={message}
        usesError={false}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        maxLength={100}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            const type = photo ? "image" : "text";
            onSendMessage(photo ?? message, type, myUsername);
            setPhoto(undefined);
            setMessage("");
          }
        }}
      />
      <img
        src={send}
        alt=""
        className="cursor-pointer"
        onClick={() => {
          const type = photo ? "image" : "text";
          onSendMessage(photo ?? message, type, myUsername);
          setPhoto(undefined);
          setMessage("");
          setMessage("");
        }}
      />
    </div>
  );
};

export const SendMessage = ({
  myUsername,
  friendUsername,
  onSendMessage,
}: SendMessageProps) => {
  return (
    <SendMessageLayout
      mobile={false}
      onSendMessage={onSendMessage}
      myUsername={myUsername}
      friendUsername={friendUsername}
    />
  );
};
export const SendMessageMobile = ({
  myUsername,
  friendUsername,
  onSendMessage,
}: SendMessageProps) => {
  return (
    <SendMessageLayout
      mobile={true}
      onSendMessage={onSendMessage}
      myUsername={myUsername}
      friendUsername={friendUsername}
    />
  );
};

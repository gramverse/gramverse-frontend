import { useState } from "react";
import Emoji from "@asset/svg/emoji.svg";
import { EmojiKeyboard } from "../../components/emoji/emoji-keyboard";
import { InputField } from "../../components/input-field";
import send from "@asset/svg/letter.svg";
import { UploadPhoto } from "./upload-photo";
import Close from "@asset/svg/close.svg";
import clsx from "clsx";
export const SendMessageLayout = ({ mobile }: { mobile: boolean }) => {
  const [message, setMessage] = useState("");
  const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);
  const [photo, setPhoto] = useState<File>();
  return (
    <div
      className="relative flex h-10 w-fit items-center justify-center gap-2"
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
            src={URL.createObjectURL(photo)}
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
      <UploadPhoto
        setSelectedPhoto={(arg: File) => setPhoto(arg)}
        className="h-5"
      />
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
            //add onclick handler
            if (photo) {
              //send photo
            } else if (message !== "") {
              //send message
            }
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
          //add onclick handler
          if (photo) {
            //send photo
          } else if (message !== "") {
            //send message
          }
          setPhoto(undefined);
          setMessage("");
        }}
      />
    </div>
  );
};
export const SendMessage = () => {
  return <SendMessageLayout mobile={false} />;
};
export const SendMessageMobile = () => {
  return <SendMessageLayout mobile={true} />;
};

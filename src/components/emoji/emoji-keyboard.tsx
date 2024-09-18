import clsx from "clsx";
import { topEmojis } from "./emoji-utilities";

export const EmojiKeyboard = ({
  setEmoji,
  visibility,
  className,
}: {
  setEmoji: (emoji: string) => void;
  visibility: boolean;
  className?: string;
}) => {
  return (
    <div
      lang="en"
      dir="ltr"
      id="emoji"
      className={clsx(
        "grid-flow-rows absolute grid grid-cols-10 rounded-b-xl rounded-tr-xl border border-solid border-gray-300 bg-primary p-2 text-left font-mono normal-nums brightness-105 transition-all",
        visibility && "z-20 h-44",
        !visibility && "-z-10 h-0 overflow-hidden",
        className,
      )}
    >
      {topEmojis.map((emoji, index) => (
        <p
          key={index}
          className="m-1"
          onClick={() => {
            setEmoji(String.fromCodePoint(emoji));
            (document.querySelector("#caption") as HTMLElement).focus();
          }}
        >
          {String.fromCodePoint(emoji)}
        </p>
      ))}
    </div>
  );
};

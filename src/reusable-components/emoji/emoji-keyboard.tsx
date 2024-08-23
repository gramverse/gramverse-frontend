import clsx from "clsx";
import { topEmojis } from "./emoji-utilities";

export const EmojiKeyboard = ({
  setEmoji,
  visibility,
}: {
  setEmoji: (emoji: number) => void;
  visibility: boolean;
}) => {
  return (
    <div
      className={clsx(
        "grid-flow-rows absolute -left-2 grid grid-cols-10 rounded-b-xl rounded-tr-xl border border-solid border-gray-300 bg-primary p-2 brightness-105 transition-all",
        visibility && "z-20 h-44",
        !visibility && "-z-10 h-0 overflow-hidden",
      )}
    >
      {topEmojis.map((emoji, index) => (
        <span
          key={index}
          className="m-1"
          onClick={() => {
            setEmoji(emoji);
            (document.querySelector("#caption") as HTMLElement).focus();
          }}
        >
          {String.fromCodePoint(emoji)}
        </span>
      ))}
    </div>
  );
};

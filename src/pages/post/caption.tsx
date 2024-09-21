import { forwardRef, TextareaHTMLAttributes, useState } from "react";
import { EmojiKeyboard } from "../../components/emoji/emoji-keyboard";
import { TextArea } from "../../components/text-area";

interface captionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  hashtags: Array<string>;
}
import Emoji from "@asset/svg/emoji.svg";

export const Caption = forwardRef<HTMLTextAreaElement, captionProps>(
  (props, ref) => {
    const { name, onChange, caption, setCaption } = props;

    const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);
    return (
      <div className="flex flex-col items-center">
        <span className="flex w-full flex-row items-center justify-between">
          <p>کپشن مورد نظرت رو بنویس:</p>
          <div className="flex gap-2">
            <span
              className="flex h-5 w-5 items-baseline justify-center rounded-full border border-solid border-gray-600 text-base text-gray-700 shadow-sm shadow-black"
              onClick={() => {
                (document.querySelector("#caption") as HTMLElement).focus();
                setCaption((caption) => caption.concat("#"));
              }}
            >
              {"#"}
            </span>
            <img
              src={Emoji}
              alt=""
              onClick={() =>
                setKeyboardVisibility((isKeyBoardVisible) => !isKeyBoardVisible)
              }
            />
          </div>
        </span>
        <div className="relative h-52 w-80 self-center">
          <EmojiKeyboard
            visibility={isKeyBoardVisible}
            className="-left-2"
            setEmoji={(emoji) => {
              setCaption((caption) => caption.concat(emoji));
              setKeyboardVisibility(false);
            }}
          />
          <TextArea
            className="absolute z-10"
            id="caption"
            autoFocus
            ref={ref}
            value={caption}
            name={name}
            onChange={(e) => {
              setCaption(e.target.value);
              onChange?.(e);
            }}
            maxLength={100}
            rows={7}
            cols={40}
          />
        </div>
      </div>
    );
  },
);

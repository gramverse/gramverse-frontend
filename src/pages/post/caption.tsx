import { forwardRef, TextareaHTMLAttributes, useState } from "react";
import { EmojiKeyboard } from "../../components/emoji/emoji-keyboard";
import { TextArea } from "../../components/text-area";

interface captionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  hashtags: Array<string>;
}
import Emoji from "../../assets/svg/emoji.svg";

export const Caption = forwardRef<HTMLTextAreaElement, captionProps>(
  (props, ref) => {
    const { name, onChange, caption, setCaption } = props;

    const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);
    return (
      <div className="flex flex-col items-center">
        <span className="flex w-full flex-row justify-around">
          <p>کپشن مورد نظرت رو بنویس:</p>
          <img
            src={Emoji}
            alt=""
            onClick={() =>
              setKeyboardVisibility((isKeyBoardVisible) => !isKeyBoardVisible)
            }
          />
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

import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { InputField } from "../../components/input-field";
import Close from "@asset/svg/close.svg";
import { useFindUser } from "../../services/post";
import { Alert } from "../../components/alert";
import { useGetAccountHints } from "../../services/search";
import clsx from "clsx";

interface mentionProps extends InputHTMLAttributes<HTMLInputElement> {
  mentions: Array<string>;
  setMentions: React.Dispatch<React.SetStateAction<string[]>>;
  removeMention: (index: number) => void;
}

export const Mention = forwardRef<HTMLInputElement, mentionProps>(
  (props, ref) => {
    const { name, onChange, mentions, setMentions, removeMention } = props;
    const [userName, setUserName] = useState("");
    const { data, isSuccess } = useFindUser(userName.slice(1));
    const { data: hint } = useGetAccountHints({ keyword: userName.slice(1) });
    const [isSuggestBoxVisible, viewSuggestBox] = useState(false);
    useEffect(() => {
      if (
        hint &&
        hint.pages.flatMap((data) => data.users).length > 0 &&
        userName !== ""
      ) {
        viewSuggestBox(true);
      } else {
        viewSuggestBox(false);
      }
    }, [hint, userName]);
    return (
      <div className="relative flex w-full flex-col items-center">
        <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
        <Alert
          status={data && data.exists ? "success" : "error"}
          message={
            data && data.exists
              ? ` ${userName.slice(1)} وجود دارد`
              : data && !data.exists
                ? ` ${userName.slice(1)} وجود ندارد`
                : ""
          }
        />
        <InputField
          direction="left"
          autoFocus
          ref={ref}
          dir="ltr"
          name={name}
          value={userName}
          fieldsize={"medium"}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              if (userName.match(/(@[A-Za-z0-9_]+)/g)?.length === 1) {
                if (
                  data &&
                  data.exists &&
                  isSuccess &&
                  !mentions.includes(userName.slice(1))
                ) {
                  setMentions((mentions) => mentions.concat(userName.slice(1)));
                  setUserName("");
                }
              }
            } else if (e.key == " ") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const typedMention = e.target.value;
            setUserName(typedMention);
            onChange?.(e);
          }}
        />
        {isSuggestBoxVisible && (
          <div
            className={clsx(
              "absolute -left-2 top-48 z-20 flex h-fit w-fit flex-col items-end gap-5 rounded-b-2xl rounded-tr-2xl border border-solid border-gray-300 bg-white p-4 text-base",
            )}
          >
            {hint?.pages
              .flatMap((data) => data.users)
              .map((account) => (
                <div
                  key={account._id}
                  className="cursor-pointer"
                  onClick={() => {
                    viewSuggestBox(false);
                    setUserName("");
                    if (!mentions.includes(account.userName)) {
                      setMentions((mentions) =>
                        mentions.concat(account.userName),
                      );
                    }
                  }}
                >
                  {account.userName}
                </div>
              ))}
          </div>
        )}

        <div className="flex flex-row-reverse flex-wrap self-end">
          {mentions.map((mention, index) => (
            <div className="relative h-10" key={mention}>
              <img
                src={Close}
                className="absolute -left-1 -top-2 z-10 h-4 w-4 cursor-pointer"
                onClick={() => removeMention(index)}
              />
              <span
                key={mention + index}
                className="mx-1 my-2 rounded-md bg-gray-300 px-2 py-2 text-xs text-black"
              >
                {mention}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

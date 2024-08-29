import { nanoid } from "nanoid";
import { InputHTMLAttributes, forwardRef } from "react";
import { InputField } from "../../reusable-components/input-field";
import Close from "../../assets/svg/close.svg";
// import { Alert } from "../../reusable-components/alert";
// import { useFindUser } from "../../api-hooks/post";

interface mentionProps extends InputHTMLAttributes<HTMLInputElement> {
  mentions: Array<string>;
  setMentions: React.Dispatch<React.SetStateAction<string[]>>;
  removeMention: (index: number) => void;
}
export const Mention = forwardRef<HTMLInputElement, mentionProps>(
  (props, ref) => {
    const { name, onChange, mentions, setMentions, removeMention } = props;
    // const [userName, setUserName] = useState("");
    // const [isUserFound, setUserFound] = useState(true);
    // const { refetch } = useFindUser(userName);
    // useEffect(() => {
    //   refetch().then((value) => {
    //     if (value) {
    //       console.log(value);
    //       setMentions((mentions) => mentions.concat(userName));
    //       setUserFound(true);
    //     } else {
    //       setUserFound(false);
    //     }
    //   });
    // }, [refetch, setMentions, userName]);

    return (
      <div className="flex w-full flex-col items-center">
        <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
        {/* {isUserFound ? "" : "کاربر وجود ندارد"} */}
        {/* <Alert status="error" message={isUserFound ? "" : "کاربر وجود ندارد"} /> */}
        <InputField
          direction="left"
          autoFocus
          ref={ref}
          dir="ltr"
          name={name}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              const typedMention = (e.target as HTMLInputElement).value;
              if (typedMention.match(/(@[A-Za-z0-9_]+)/g)?.length === 1) {
                setMentions((mentions) =>
                  mentions.concat(typedMention.slice(1)),
                );
                (e.target as HTMLInputElement).value = "";
              }
            } else if (e.key == " ") {
              e.preventDefault();
              (e.target as HTMLInputElement).value = (
                e.target as HTMLInputElement
              ).value.trim();
            }
          }}
          onChange={onChange}
          fieldsize={"medium"}
        />

        <div className="flex flex-row-reverse flex-wrap self-end">
          {mentions.map((mention, index) => (
            <div className="relative h-10" key={nanoid()}>
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

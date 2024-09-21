import { InputField } from "../../../components/input-field";
import search from "@asset/svg/search.svg";
import { useGetAccountHints } from "../../../services/search";
import { useContext, useEffect, useState } from "react";
import { UserProfileSummary } from "../../../components/user-profile-summary";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { UserNameContext } from "../../../router/Router";
const setHistory = (history: string, userName: string) => {
  const hist = localStorage.getItem(`search-accounts ${userName}`);
  if (hist) {
    localStorage.setItem(
      `search-accounts ${userName}`,
      hist.concat(" ").concat(history),
    );
  } else {
    localStorage.setItem(`search-accounts ${userName}`, history);
  }
};
export const SearchBar = ({
  setSelectedKeyword,
  fieldSize,
}: {
  setSelectedKeyword: (arg: string) => void;
  fieldSize?: "xsmall" | "small" | "medium" | "large" | "mobile";
}) => {
  const [keyword, setKeyword] = useState("");
  const { data: hint } = useGetAccountHints({ keyword });
  const [isSuggestBoxVisible, viewSuggestBox] = useState(false);
  const myUserName = useContext(UserNameContext);
  useEffect(() => {
    if (hint && hint.pages.flatMap((data) => data.users).length > 0) {
      viewSuggestBox(true);
    } else {
      viewSuggestBox(false);
    }
  }, [hint]);
  return (
    <div className="relative overflow-x-clip">
      <InputField
        fieldsize={fieldSize ? fieldSize : "medium"}
        svg={search}
        id={"search-bar"}
        svgLocation="end"
        value={keyword}
        usesError={false}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setHistory(keyword, myUserName);
            setKeyword("");
            viewSuggestBox(false);
            setSelectedKeyword(keyword);
          } else if (e.key == " ") {
            if (keyword === "") {
              e.preventDefault();
            }
          }
        }}
      />
      {isSuggestBoxVisible && (
        <div
          className={clsx(
            fieldSize === "mobile" &&
              "absolute left-2 flex h-fit w-56 flex-col gap-5 rounded-b-2xl rounded-tr-2xl border border-solid border-gray-300 bg-white py-4 text-sm",
            fieldSize !== "mobile" &&
              "absolute flex h-fit w-fit flex-col gap-5 rounded-b-3xl rounded-tl-3xl border border-solid border-gray-300 bg-white py-4 text-lg",
          )}
        >
          {hint?.pages
            .flatMap((data) => data.users)
            .map((account) => (
              <UserProfileSummary
                key={account._id}
                className={clsx(
                  fieldSize === "mobile" && "px-2",
                  fieldSize !== "mobile" && "px-20",
                )}
                profilePicture={account.profileImage}
                userName={account.userName}
                onClick={() => {
                  viewSuggestBox(false);
                  setHistory(account.userName, myUserName);
                  setKeyword("");
                  setSelectedKeyword(account.userName);
                }}
              />
            ))}
          {localStorage.getItem(`search-accounts ${myUserName}`)?.split(" ")
            .length && (
            <div className="h-[0.5px] w-full border border-solid border-gray-300" />
          )}
          {localStorage
            .getItem(`search-accounts ${myUserName}`)
            ?.split(" ")
            .slice(-3)
            .map((item) => (
              <div
                key={nanoid()}
                className={clsx(
                  "flex w-full cursor-pointer flex-row justify-start gap-5",
                  fieldSize === "mobile" && "px-2",
                  fieldSize !== "mobile" && "px-20",
                )}
                onClick={() => {
                  viewSuggestBox(false);
                  setKeyword("");
                  setSelectedKeyword(item);
                }}
              >
                <img src={search} width={25} height={25} alt="" />
                <div>{item}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

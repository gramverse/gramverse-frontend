import { InputField } from "../../../components/input-field";
import search from "../../../assets/svg/search.svg";
import { useGetAccountHints } from "../../../services/search";
import { useEffect, useState } from "react";
import { UserProfileSummary } from "../../../components/user-profile-summary";
import clsx from "clsx";
const setHistory = (history: string) => {
  const hist = localStorage.getItem("search-accounts");
  if (hist) {
    localStorage.setItem("search-accounts", hist.concat(" ").concat(history));
  } else {
    localStorage.setItem("search-accounts", history);
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

  useEffect(() => {
    if (hint && hint.pages.flatMap((data) => data.users).length > 0) {
      viewSuggestBox(true);
    } else {
      viewSuggestBox(false);
    }
  }, [hint]);
  return (
    <div>
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
            setHistory(keyword);
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
              "absolute flex h-fit w-60 flex-col gap-5 rounded-b-2xl rounded-tr-2xl border border-solid border-gray-300 bg-white py-4 text-sm",
            fieldSize !== "mobile" &&
              "absolute flex h-fit w-fit flex-col gap-5 rounded-b-3xl rounded-tl-3xl border border-solid border-gray-300 bg-white py-4 text-lg",
          )}
        >
          {hint?.pages
            .flatMap((data) => data.users)
            .map((account) => (
              <UserProfileSummary
                className={clsx(
                  fieldSize === "mobile" && "px-2",
                  fieldSize !== "mobile" && "px-20",
                )}
                profilePicture={account.profileImage}
                userName={account.userName}
                onClick={() => {
                  viewSuggestBox(false);
                  setHistory(account.userName);
                  setKeyword("");
                  setSelectedKeyword(account.userName);
                }}
              />
            ))}
          {localStorage.getItem("search-accounts")?.split(" ").length && (
            <div className="h-[0.5px] w-full border border-solid border-gray-300" />
          )}
          {localStorage
            .getItem("search-accounts")
            ?.split(" ")
            .slice(-3)
            .map((item) => (
              <div
                className="flex w-full cursor-pointer flex-row justify-start gap-5 px-20"
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

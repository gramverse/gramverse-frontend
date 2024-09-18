import { InputField } from "../../../components/input-field";
import search from "../../../assets/svg/search.svg";
import { useGetHashtagHints } from "../../../services/search";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
const setHistory = (history: string) => {
  const hist = localStorage.getItem("search-hashtags");
  if (hist) {
    localStorage.setItem("search-hashtags", hist.concat(" ").concat(history));
  } else {
    localStorage.setItem("search-hashtags", history);
  }
};
export const SearchBar = ({
  setSelectedKeyword,
  setSpecFlag,
  fieldSize,
}: {
  setSelectedKeyword: (arg: string) => void;
  setSpecFlag: (arg: boolean) => void;
  fieldSize?: "xsmall" | "small" | "medium" | "large" | "mobile";
}) => {
  const [keyword, setKeyword] = useState("");
  const { data: hint } = useGetHashtagHints(keyword);
  const [isSuggestBoxVisible, viewSuggestBox] = useState(false);
  useEffect(() => {
    if (hint && hint.pages.flatMap((data) => data.tags).length > 0) {
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
        usesError={false}
        svgLocation="end"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setHistory(keyword);
            setSpecFlag(false);
            setSelectedKeyword(keyword);
            setKeyword("");
            viewSuggestBox(false);
          } else if (e.key == " ") {
            if (keyword === "") {
              e.preventDefault();
            } else {
              e.preventDefault();
              (e.target as HTMLInputElement).value = keyword.concat("_");
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
            .flatMap((data) => data.tags)
            .map((hashtag) => (
              <div
                key={nanoid()}
                className={clsx(
                  fieldSize === "mobile" && "px-2",
                  fieldSize !== "mobile" && "px-20",
                )}
                onClick={() => {
                  setHistory(hashtag._id);
                  setSpecFlag(true);
                  setSelectedKeyword(hashtag._id);
                  setKeyword("");
                  viewSuggestBox(false);
                }}
              >
                {hashtag._id}
              </div>
            ))}
          {localStorage.getItem("search-hashtags")?.split(" ").length && (
            <div className="h-[0.5px] w-full border border-solid border-gray-300" />
          )}
          {localStorage
            .getItem("search-hashtags")
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

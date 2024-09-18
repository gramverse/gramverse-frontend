import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TwinTab } from "../../components/twin-tabs";
import { SearchBar as AccountsSearchBar } from "./search-accounts/search-bar";
import { SearchBar as PostsSearchBar } from "./search-posts/search-bar";
import {
  SearchAccounts,
  SearchAccountsMobile,
} from "./search-accounts/search-accounts";
import { RoundPicture } from "../../components/round-picture";
import { useGetProfile } from "../../services/get-my-profile";
import { SearchPosts, SearchPostsMobile } from "./search-posts/search-posts";

export const SearchLayout = ({ mobile }: { mobile: boolean }) => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    switch (true) {
      case location.pathname.includes("search-accounts"):
        setValue(0);
        break;
      case location.pathname.includes("search-posts"):
        setValue(1);
    }
  }, [location.pathname]);
  const [accountKeyword, setAccountKeyword] = useState("");
  const [tagKeyword, setTagKeyword] = useState("");
  const [specFlag, setSpecFlag] = useState(false);

  return (
    <div
      className={clsx(
        "mt-20 flex w-full grow flex-col items-start justify-start gap-4 bg-primary",
      )}
    >
      {value == 0 && (
        <AccountsSearchBar setSelectedKeyword={setAccountKeyword} />
      )}
      {value == 1 && (
        <PostsSearchBar
          setSelectedKeyword={setTagKeyword}
          setSpecFlag={setSpecFlag}
        />
      )}

      <TwinTab
        className={clsx(!mobile && "ms-4 self-start", mobile && "self-center")}
        tab1={{ text: "افراد", url: "/search-accounts" }}
        tab2={{ text: "پست ها", url: "/search-posts" }}
        tab={value}
        handleClick={(arg: number) => setValue(arg)}
      />
      {value == 0 && (
        <SearchAccounts
          selectedKeyword={accountKeyword}
          setSelectedKeyword={setAccountKeyword}
        />
      )}
      {value == 1 && (
        <SearchPosts
          setSelectedKeyword={setTagKeyword}
          specFlag={specFlag}
          selectedKeyword={tagKeyword}
        />
      )}
    </div>
  );
};

export const Search = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    switch (true) {
      case location.pathname.includes("search-accounts"):
        setValue(0);
        break;
      case location.pathname.includes("search-posts"):
        setValue(1);
    }
  }, [location.pathname]);
  const [accountKeyword, setAccountKeyword] = useState("");
  const [tagKeyword, setTagKeyword] = useState("");
  const [specFlag, setSpecFlag] = useState(false);

  return (
    <div
      className={clsx(
        "mt-20 flex w-full grow flex-col items-start justify-start gap-4 bg-primary",
      )}
    >
      {value == 0 && (
        <AccountsSearchBar setSelectedKeyword={setAccountKeyword} />
      )}
      {value == 1 && (
        <PostsSearchBar
          setSelectedKeyword={setTagKeyword}
          setSpecFlag={setSpecFlag}
        />
      )}

      <TwinTab
        className={"ms-4 self-start"}
        tab1={{ text: "افراد", url: "/search-accounts" }}
        tab2={{ text: "پست ها", url: "/search-posts" }}
        tab={value}
        handleClick={(arg: number) => setValue(arg)}
      />
      {value == 0 && (
        <SearchAccounts
          selectedKeyword={accountKeyword}
          setSelectedKeyword={setAccountKeyword}
        />
      )}
      {value == 1 && (
        <SearchPosts
          setSelectedKeyword={setTagKeyword}
          specFlag={specFlag}
          selectedKeyword={tagKeyword}
        />
      )}
    </div>
  );
};

export const SearchMobile = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const { data: profile, isSuccess } = useGetProfile();
  useEffect(() => {
    switch (true) {
      case location.pathname.includes("search-accounts"):
        setValue(0);
        break;
      case location.pathname.includes("search-posts"):
        setValue(1);
    }
  }, [location.pathname]);
  const [accountKeyword, setAccountKeyword] = useState("");
  const [tagKeyword, setTagKeyword] = useState("");
  const [specFlag, setSpecFlag] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        "mt-2 flex w-full grow flex-col items-start justify-start gap-4 bg-primary",
      )}
    >
      <div className="w-full flex-col bg-primary">
        <div className="flex h-fit w-full items-center justify-between">
          <RoundPicture
            classes="mb-4"
            picture={isSuccess ? profile.profileImage : ""}
            onClick={
              isSuccess ? () => navigate(`/${profile.userName}`) : () => {}
            }
          />
          {value == 0 && (
            <AccountsSearchBar
              fieldSize="mobile"
              setSelectedKeyword={setAccountKeyword}
            />
          )}
          {value == 1 && (
            <PostsSearchBar
              fieldSize="mobile"
              setSelectedKeyword={setTagKeyword}
              setSpecFlag={setSpecFlag}
            />
          )}
        </div>
        <div className="h-0.5 bg-gray-300" />
      </div>

      <TwinTab
        className={"self-center"}
        tab1={{ text: "افراد", url: "/search-accounts" }}
        tab2={{ text: "پست ها", url: "/search-posts" }}
        tab={value}
        handleClick={(arg: number) => setValue(arg)}
      />
      {value == 0 && (
        <SearchAccountsMobile
          selectedKeyword={accountKeyword}
          setSelectedKeyword={setAccountKeyword}
        />
      )}
      {value == 1 && (
        <SearchPostsMobile
          setSelectedKeyword={setTagKeyword}
          specFlag={specFlag}
          selectedKeyword={tagKeyword}
        />
      )}
    </div>
  );
};

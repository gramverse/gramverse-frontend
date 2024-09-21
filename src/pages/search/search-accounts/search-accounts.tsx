import { useInView } from "react-intersection-observer";
import { Loading } from "../../../components/loading";
import { useGetAccounts } from "../../../services/search";
import { useEffect } from "react";
import { SearchedAccount } from "./account";
import { Button } from "../../../components/button";
import { UserProfileSummary } from "../../../components/user-profile-summary";
import { useNavigate } from "react-router-dom";
type SearchAccountProps = {
  setSelectedKeyword: (arg: string) => void;
  selectedKeyword: string;
};

export const SearchAccounts = (props: SearchAccountProps) => {
  const { setSelectedKeyword, selectedKeyword } = props;
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetAccounts({
      limit: 1,
      keyword: selectedKeyword,
    });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    data?.pages,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);

  return (
    <div className="flex w-full grow flex-col gap-2 text-right text-xs">
      {selectedKeyword !== "" && (
        <Button
          size="medium"
          btnColor="outline"
          classes="m-2"
          onClick={() => {
            setSelectedKeyword("");
          }}
        >
          <span>x</span>
          {selectedKeyword}
        </Button>
      )}
      <div className="grid h-[535px] max-h-fit grid-cols-3 justify-start gap-3">
        {data?.pages
          .flatMap((page) => page.users)
          .map((account) => (
            <SearchedAccount
              key={account._id}
              profileImage={account.profileImage}
              followerCount={account.followerCount}
              userName={account.userName}
              followState={account.followState}
            />
          ))}
        <Loading
          isLoading={isFetching || isFetchingNextPage}
          ref={ref}
          className="my-3"
        />
      </div>
    </div>
  );
};

export const SearchAccountsMobile = (props: SearchAccountProps) => {
  const { setSelectedKeyword, selectedKeyword } = props;
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetAccounts({
      limit: 1,
      keyword: selectedKeyword,
    });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    data?.pages,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);
  const navigate = useNavigate();
  return (
    <div className="flex h-[400px] w-full grow flex-col gap-2 overflow-scroll text-right text-xs">
      {selectedKeyword !== "" && (
        <Button
          size="medium"
          btnColor="outline"
          classes="m-2"
          onClick={() => {
            setSelectedKeyword("");
          }}
        >
          <span>x</span>
          {selectedKeyword}
        </Button>
      )}
      <div className="flex flex-col items-center gap-3">
        {data?.pages
          .flatMap((page) => page.users)
          .map((account) => (
            <UserProfileSummary
              key={account._id}
              className="w-full"
              followerCount={account.followerCount}
              userName={account.userName}
              profilePicture={account.profileImage}
              onClick={() => {
                navigate(`/${account.userName}`);
              }}
            />
          ))}
      </div>
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        ref={ref}
        className="my-3"
      />
    </div>
  );
};

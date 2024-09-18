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
      <div className="grid grid-cols-3 gap-3">
        {data?.pages
          .flatMap((page) => page.users)
          .map((account) => (
            <SearchedAccount
              profileImage={account.profileImage}
              followerCount={account.followerCount}
              userName={account.userName}
              followState={account.followState}
              fullName={account.fullName}
            />
          ))}
      </div>
      <Loading isLoading={isFetching || isFetchingNextPage} ref={ref} />
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
      <div className="flex flex-col items-center gap-3">
        {data?.pages
          .flatMap((page) => page.users)
          .map((account) => (
            <UserProfileSummary
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
      <Loading isLoading={isFetching || isFetchingNextPage} ref={ref} />
    </div>
  );
};

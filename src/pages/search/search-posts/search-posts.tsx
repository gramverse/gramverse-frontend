import { useInView } from "react-intersection-observer";
import { Loading } from "../../../components/loading";
import { useEffect, useState } from "react";
import { useGetPosts } from "../../../services/search";
import { SearchedPost } from "./post";
import { Modal } from "../../../components/modal";
import { UserPostModal } from "../../post-view/user-post-modal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
type SearchPosts = {
  setSelectedKeyword: (arg: string) => void;
  specFlag: boolean;
  selectedKeyword: string;
};
export const SearchPosts = ({
  selectedKeyword,
  setSelectedKeyword,
  specFlag,
}: SearchPosts) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetPosts({
      limit: 1,
      keyword: selectedKeyword,
      spec: specFlag,
    });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
    selectedKeyword,
  ]);
  const [isPostOpen, openPost] = useState(false);
  const [post, setPost] = useState({ id: "", userName: "" });

  return (
    <div className="flex w-full grow flex-col gap-2 px-4 text-right text-xs">
      <Modal
        isOpen={isPostOpen}
        close={() => {
          openPost(false);
        }}
      >
        <UserPostModal
          postId={post.id}
          close={() => openPost(false)}
          userName={post.userName}
        />
      </Modal>
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
      <div className="flex flex-row flex-wrap gap-3 px-5">
        {data?.pages
          .flatMap((page) => page.posts)
          .slice(0, 3)
          .map((post) => (
            <SearchedPost
              key={post.postId}
              setPost={(post?: { id: string; userName: string }) => {
                setPost(post!);
                openPost(true);
              }}
              postImage={post.postImage}
              size={"xl"}
              postId={post.postId}
              userName={post.userName}
            />
          ))}
        {data?.pages
          .flatMap((page) => page.posts)
          .slice(3, 7)
          .map((post) => (
            <SearchedPost
              setPost={(post?: { id: string; userName: string }) => {
                setPost(post!);
                openPost(true);
              }}
              postImage={post.postImage}
              size={"lg"}
              postId={post.postId}
              userName={post.userName}
            />
          ))}
        {data?.pages
          .flatMap((page) => page.posts)
          .slice(7)
          .map((post) => (
            <SearchedPost
              setPost={(post?: { id: string; userName: string }) => {
                setPost(post!);
                openPost(true);
              }}
              postImage={post.postImage}
              size={"medium"}
              postId={post.postId}
              userName={post.userName}
            />
          ))}
      </div>
      <Loading isLoading={isFetching || isFetchingNextPage} ref={ref} />
    </div>
  );
};

export const SearchPostsMobile = ({
  selectedKeyword,
  setSelectedKeyword,
  specFlag,
}: SearchPosts) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetPosts({
      limit: 1,
      keyword: selectedKeyword,
      spec: specFlag,
    });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
    selectedKeyword,
  ]);
  const navigate = useNavigate();

  return (
    <div className="flex w-full grow flex-col gap-2 text-right text-xs">
      {selectedKeyword !== "" && (
        <Button
          size="medium"
          btnColor="outline"
          onClick={() => {
            setSelectedKeyword("");
          }}
        >
          <span>x</span>
          {selectedKeyword}
        </Button>
      )}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        {data?.pages
          .flatMap((page) => page.posts)
          .slice(0, 1)
          .map((post) => (
            <SearchedPost
              setPost={() => {
                navigate(`/${post.userName}/${post.postId}`);
              }}
              postImage={post.postImage}
              size={"xl"}
              postId={post.postId}
              userName={post.userName}
            />
          ))}
        {data?.pages
          .flatMap((page) => page.posts)
          .slice(1, 3)
          .map((post) => (
            <SearchedPost
              setPost={() => {
                navigate(`/${post.userName}/${post.postId}`);
              }}
              postImage={post.postImage}
              size={"medium"}
              postId={post.postId}
              userName={post.userName}
            />
          ))}
        {data?.pages
          .flatMap((page) => page.posts)
          .slice(3)
          .map((post) => (
            <SearchedPost
              setPost={() => {
                navigate(`/${post.userName}/${post.postId}`);
              }}
              postImage={post.postImage}
              size={"small"}
              postId={post.postId}
              userName={post.userName}
            />
          ))}
      </div>
      <Loading isLoading={isFetching || isFetchingNextPage} ref={ref} />
    </div>
  );
};

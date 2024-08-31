import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../reusable-components/modal";
import { PostModal } from "../post-view/post-modal";
import { EditPost } from "../post/edit-post";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { useGetPosts } from "../../api-hooks/my-page";

export const Gallery = () => {
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");
  const postLimit = 6;
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const [isEditOpen, OpenEdit] = useState(false);

  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    isError: isPostError,
    error: postError,
  } = useGetPosts(postLimit);
  const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);
  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }

  return (
    <div className="flex h-[35.62rem] w-full flex-row flex-wrap gap-5 overflow-y-scroll">
      <Modal
        isOpen={isPostOpen}
        close={() => {
          openPost(false);
        }}
      >
        <PostModal
          postId={postId}
          openEditPost={() => {
            openPost(false);
            OpenEdit(true);
          }}
        />
      </Modal>
      <Modal
        isOpen={isEditOpen}
        close={() => {
          OpenEdit(false);
        }}
      >
        <EditPost
          postId={postId}
          close={() => {
            OpenEdit(false);
          }}
        />
      </Modal>
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="h-[19rem] w-[18.43rem] overflow-hidden rounded-t-3xl bg-neutral-400"
            onClick={() => {
              setPostId(post._id);
              openPost(true);
            }}
          >
            <img
              className="h-full w-full object-cover"
              src={post.photoUrls[0]}
            />
          </div>
        );
      })}

      <div
        ref={nearEndPostRef}
        className={clsx(
          "flex w-full items-center justify-center text-2xl",
          hasNextPage ? "h-[calc(11rem/3)]" : "", //check it!!!!!!!!!!!!!!!!
        )}
      >
        {hasNextPage && isFetchingNextPostPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

export const GalleryMobile = () => {
  const navigate = useNavigate();
  const postLimit = 6;
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    isError: isPostError,
    error: postError,
  } = useGetPosts(postLimit);
  const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);
  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }

  return (
    <div className="flex w-[19.4rem] flex-row flex-wrap gap-5">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="h-36 w-36 rounded-t-3xl bg-neutral-400"
            onClick={() => {
              navigate(`post/${post._id}`);
            }}
          >
            <img
              className="h-full w-full object-cover"
              src={post.photoUrls[0]}
            />
          </div>
        );
      })}
      <div
        ref={nearEndPostRef}
        className={clsx(
          "flex w-full items-center justify-center text-2xl",
          hasNextPage ? "h-[calc(11rem/3)]" : "", //check it!!!!!!!!!!!!!!!!
        )}
      >
        {hasNextPage && isFetchingNextPostPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

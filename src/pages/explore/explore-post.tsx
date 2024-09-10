import { useNavigate } from "react-router-dom";
import { ExplorePostInfo } from "../../types/explore";
import { Like } from "../post-view/post-shared-components/like";
import { Bookmark } from "../post-view/post-shared-components/bookmark";
import { Comment } from "../post-view/post-shared-components/comment-count";
import { FollowingersInfo } from "../followinger-list/followinger-info";
import clsx from "clsx";
import { useState } from "react";
import { Modal } from "../../components/modal";
import { UserPostModal } from "../post-view/user-post-modal";

interface ExplorePostProps {
  post: ExplorePostInfo;
  closeModal?: () => void;
}

export const ExplorePost = ({ post, closeModal }: ExplorePostProps) => {
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");
  const navigate = useNavigate();
  const closePostModal = () => {
    openPost(false);
    closeModal?.();
  };
  return (
    <>
      <Modal isOpen={isPostOpen} close={closePostModal}>
        <UserPostModal
          postId={postId}
          userName={post.userName}
          close={closePostModal}
        />
      </Modal>

      <div
        className={clsx(
          "flex h-[27.31rem] w-[18rem] flex-col items-start gap-4 rounded-3xl border-solid",
          post.forCloseFriends
            ? "border-4 border-green-500"
            : "border border-form-border",
        )}
      >
        <div
          className="h-[18rem] w-[18rem] overflow-hidden rounded-t-3xl bg-neutral-400"
          onClick={() => {
            setPostId(post._id);
            openPost(true);
          }}
        >
          <img className="h-full w-full object-cover" src={post.photoUrls[0]} />
        </div>
        <div className="flex w-full items-start px-6 py-1">
          <div className="flex items-center gap-1">
            <Comment
              onClick={() => {
                navigate(`/${post.userName}/post/${post._id}`);
              }}
            />
            <span>{post.commentsCount}</span>
          </div>
          <div className="mr-4 flex items-center gap-1">
            <Like isLiked={post.isLiked} />
            <span>{post.likesCount}</span>
          </div>
          <div className="mr-4 flex items-center gap-1">
            <Bookmark isBookmarked={post.isBookmarked} />
            <span>{post.bookmarksCount}</span>
          </div>
        </div>
        <div className="px-4 py-1">
          <FollowingersInfo
            activityPermit={false}
            userName={post.userName}
            followerCount={post.followerCount}
            profileImage={post.profileImage}
            noBorder={true}
          />
        </div>
      </div>
    </>
  );
};

export const ExplorePostMobile = ({ post }: ExplorePostProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={clsx(
          "mx-auto flex h-[27.75rem] w-[19.4rem] flex-col items-start gap-4 rounded-3xl border-solid",
          post.forCloseFriends
            ? "border-4 border-green-500"
            : "border border-form-border",
        )}
      >
        <div
          className="h-[19.4rem] w-[19.4rem] overflow-hidden rounded-t-3xl bg-neutral-400"
          onClick={() => {
            navigate(`/${post.userName}/post/${post._id}`);
          }}
        >
          <img className="h-full w-full object-cover" src={post.photoUrls[0]} />
        </div>
        <div className="flex w-full items-start px-6">
          <div className="flex items-center gap-1">
            <Comment
              onClick={() => {
                navigate(`/${post.userName}/post/${post._id}`);
              }}
            />
            <span>{post.commentsCount}</span>
          </div>
          <div className="mr-4 flex items-center gap-1">
            <Like isLiked={post.isLiked} />
            <span>{post.likesCount}</span>
          </div>
          <div className="mr-4 flex items-center gap-1">
            <Bookmark isBookmarked={post.isBookmarked} />
            <span>{post.bookmarksCount}</span>
          </div>
        </div>
        <div className="px-4 pb-2">
          <FollowingersInfo
            activityPermit={false}
            userName={post.userName}
            followerCount={post.followerCount}
            profileImage={post.profileImage}
            noBorder={true}
          />
        </div>
      </div>
    </>
  );
};

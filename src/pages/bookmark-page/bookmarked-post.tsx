import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal";
import { UserPostModal } from "../post-view/user-post-modal";
import { BookmarkPostInfo } from "../../types/bookmark-post";

interface bookmarkedPostProps {
  post: BookmarkPostInfo;
  closeModal?: () => void;
}

export const BookmarkedPost = ({ post, closeModal }: bookmarkedPostProps) => {
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");
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

      <div className="post flex h-[18rem] w-[18rem] cursor-pointer flex-col items-start gap-4 rounded-3xl border-solid border-form-border">
        <div
          className="h-full w-full overflow-hidden rounded-t-3xl bg-neutral-400"
          onClick={() => {
            setPostId(post.postId);
            openPost(true);
          }}
        >
          <img className="h-full w-full object-cover" src={post.photoUrl} />
        </div>
      </div>
    </>
  );
};

export const BookmarkedPostMobile = ({ post }: bookmarkedPostProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="post mx-auto flex h-[19.4rem] w-[19.4rem] flex-col items-start gap-4 rounded-3xl border-solid border-form-border">
        <div
          className="h-full w-full overflow-hidden rounded-t-3xl bg-neutral-400"
          onClick={() => {
            navigate(`/${post.userName}/post/${post.postId}`);
          }}
        >
          <img className="h-full w-full object-cover" src={post.photoUrl} />
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal";
import { UserPostModal } from "../post-view/user-post-modal";
import clsx from "clsx";
import { ExplorePostInfo } from "../../types/explore";

interface MentionedPostProps {
  post: ExplorePostInfo; //change to mentionPost
  closeModal?: () => void;
}

export const MentionedPost = ({ post, closeModal }: MentionedPostProps) => {
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
      </div>
    </>
  );
};

export const MentionedPostMobile = ({ post }: MentionedPostProps) => {
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
      </div>
    </>
  );
};

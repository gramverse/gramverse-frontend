import { useState } from "react";
import { Post } from "../../common/types/post";
import { PostModal } from "../post-modal";
import { CreatePost } from "../post";
type GalleryProps = {
  posts: Post[]; //remove optional
};

//change postinfo to post
export const Gallery = ({ posts }: GalleryProps) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsEditOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <>
      {isPostOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          closeModal={() => setIsPostOpen(false)}
          userName=""
          openEditPost={() => {
            setIsPostOpen(false);
            setIsEditOpen(true);
          }}
        />
      )}
      {isOpen && (
        <CreatePost post={selectedPost} Close={() => setIsEditOpen(false)} />
      )}
      <div className="flex w-[925px] flex-row flex-wrap gap-5">
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              className="h-[304px] w-[295px] overflow-hidden rounded-t-3xl bg-slate-600"
              onClick={() => {
                setSelectedPost(post);
                setIsPostOpen(true);
              }}
            >
              <img
                className="h-full w-full object-cover"
                src={post.photoUrls[0]}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

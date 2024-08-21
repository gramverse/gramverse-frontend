import { useContext, useState } from "react";
import { Post } from "../../common/types/post";
import { ModalContext } from "../main/main";
import { PostModal } from "../post-modal";

type UserGalleryProps = {
    posts: Post[];
  };
export const UserGallery = ({ posts }: UserGalleryProps) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const { setModal } = useContext(ModalContext);
    return (
      <div className="flex w-[925px] flex-row flex-wrap gap-5">
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              className="h-[304px] w-[295px] overflow-hidden rounded-t-3xl bg-neutral-400"
              onClick={() => {
                setSelectedPost(post);
                setModal(
                  selectedPost ? (
                    <PostModal post={selectedPost} userName="" />
                  ) : null,
                );
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
    );
  };
  
  export const UserGalleryMobile = ({ posts }: UserGalleryProps) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const { setModal } = useContext(ModalContext);
    return (
      <div className="flex w-[311px] flex-row flex-wrap gap-5">
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              className="h-36 w-36 overflow-hidden rounded-t-3xl bg-neutral-400"
              onClick={() => {
                setSelectedPost(post);
                setModal(
                  selectedPost ? (
                    <PostModal post={selectedPost} userName="" />
                  ) : null,
                );
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
    );
  };
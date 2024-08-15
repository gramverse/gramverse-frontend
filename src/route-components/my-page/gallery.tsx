import { useState } from "react";
import { Post } from "../../common/types/post";
type GalleryProps = {
  posts?: Post[]; //remove optional
};
//change postinfo to post
export const Gallery = ({ posts }: GalleryProps) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  return (
    <>
      <div className="flex w-[925px] flex-row flex-wrap gap-5">
        {posts?.map((post) => {
          return (
            <div
              className="h-[304px] w-[295px] rounded-t-3xl bg-slate-600"
              onClick={() => setSelectedPost(post)}
            >
              <img src={post?.photoUrls[0]} />
            </div>
          );
        })}
      </div>
      {/* {selectedPost &&<PostModal post={selectedPost} onClose={() => setSelectedPost(null)}}  */}
    </>
  );
};

import { Post } from "../../common/types/post";
import { useNavigate } from "react-router-dom";
type GalleryProps = {
  posts: Post[];
};

export const Gallery = ({ posts }: GalleryProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex grow flex-row flex-wrap gap-5">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="h-[304px] w-[295px] overflow-hidden rounded-t-3xl bg-neutral-400"
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
    </div>
  );
};

export const GalleryMobile = ({ posts }: GalleryProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-[311px] flex-row flex-wrap gap-5">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="h-36 w-36 overflow-hidden rounded-t-3xl bg-neutral-400"
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
    </div>
  );
};

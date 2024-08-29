import { Post } from "../../common/types/post";
import { useNavigate } from "react-router-dom";

type UserGalleryProps = {
  posts: Post[];
};
export const UserGallery = ({ posts }: UserGalleryProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex grow flex-row flex-wrap gap-5">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="h-[304px] w-[295px] rounded-t-3xl bg-neutral-400"
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

export const UserGalleryMobile = ({ posts }: UserGalleryProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-[311px] flex-row flex-wrap gap-5">
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
    </div>
  );
};

import clsx from "clsx";
import { Post } from "../../../types/search";
type Size = "small" | "medium" | "lg" | "xl";
const sizes: Record<Size, string> = {
  small: "h-16 aspect-square",
  medium: "h-[140px] aspect-square",
  lg: "h-[220px] aspect-square",
  xl: "h-[300px] aspect-square",
};
interface SearchedPost extends Post {
  size: Size;
  setPost: (post?: { id: string; userName: string }) => void;
}
export const SearchedPost = (props: SearchedPost) => {
  const { size, postImage, postId, userName, setPost } = props;
  return (
    <div
      className={clsx("post overflow-hidden rounded-3xl", sizes[size])}
      onClick={() => {
        setPost({ id: postId, userName: userName });
      }}
    >
      <img className="h-full w-full object-cover" src={postImage} />
    </div>
  );
};

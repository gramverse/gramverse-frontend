import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const Post = ({
  image,
  onClick,
  forCloseFriends,
}: {
  image: string;
  onClick: () => void;
  forCloseFriends: boolean;
}) => {
  return (
    <div
      className={clsx(
        "post h-[304px] w-[295px] overflow-hidden rounded-t-3xl bg-neutral-400",
        forCloseFriends && "border-4 border-solid border-green-500",
      )}
      onClick={onClick}
    >
      <img src={image} className="h-full w-full object-cover" />
    </div>
  );
};

export const PostMobile = ({
  id,
  image,
  forCloseFriends,
}: {
  id: string;
  image: string;
  forCloseFriends: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        "post h-36 w-36 overflow-hidden rounded-3xl bg-neutral-400",
        forCloseFriends && "border-4 border-solid border-green-500",
      )}
      onClick={() => {
        navigate(`post/${id}`);
      }}
    >
      <img src={image} className="h-full w-full object-cover" />
    </div>
  );
};

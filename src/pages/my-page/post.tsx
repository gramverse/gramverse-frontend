import { useNavigate } from "react-router-dom";

export const Post = ({
  image,
  onClick,
}: {
  image: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="post h-[304px] w-[295px] cursor-pointer overflow-hidden rounded-t-3xl bg-neutral-400"
      onClick={onClick}
    >
      <img src={image} className="h-full w-full object-cover" />
    </div>
  );
};

export const PostMobile = ({ id, image }: { id: string; image: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="post h-36 w-36 cursor-pointer overflow-hidden rounded-3xl bg-neutral-400"
      onClick={() => {
        navigate(`post/${id}`);
      }}
    >
      <img className="h-full w-full object-cover" src={image} />
    </div>
  );
};

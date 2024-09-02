import { ProfileSummary } from "../../reusable-components/profile-summary";
import { useNavigate } from "react-router-dom";
import { Button } from "../../reusable-components/button";
import expand from "../../assets/svg/expand.svg";
import { ContainterWeb } from "../../reusable-components/container";
import { useGetPost } from "../../api-hooks/post-details";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { useGetProfile } from "../../api-hooks/get-my-profile";
import { PostDetailSummary } from "./post-shared-components/summary-bar";

export const PostModal = ({
  postId,
  openEditPost,
}: {
  postId: string;
  openEditPost: () => void;
}) => {
  const navigate = useNavigate();
  const { data } = useGetProfile();
  const { data: post } = useGetPost(postId);
  return (
    <ContainterWeb className="relative flex grow justify-between gap-3 pt-16">
      <img
        src={expand}
        className="absolute inset-5 h-8 cursor-pointer"
        onClick={() => {
          navigate(`/${data?.userName}/post/${post?._id}`);
        }}
      />
      <Carousel photoUrls={post?.photoUrls ?? []} />
      <div className="flex h-[375px] grow flex-col justify-between gap-3 p-5">
        <div className="flex flex-row justify-between gap-5">
          <ProfileSummary />
          <Button
            onClick={() => {
              openEditPost();
            }}
          >
            ویرایش پست
          </Button>
        </div>
        <PostCaptions
          caption={post?.caption ?? ""}
          mentions={post?.mentions ?? []}
          tags={post?.tags ?? []}
          creationDate={post?.creationDate ?? ""}
        />
        <PostDetailSummary post={post} />
      </div>
    </ContainterWeb>
  );
};

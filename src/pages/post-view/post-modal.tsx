import { ProfileSummary } from "../../components/profile-summary";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import expand from "@asset/svg/expand.svg";
import { ContainterWeb } from "../../components/container";
import { useGetPost } from "../../services/post-details";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { PostDetailSummary } from "./post-shared-components/summary-bar";
import { useContext } from "react";
import { UserNameContext } from "../../router/Router";

export const PostModal = ({
  postId,
  openEditPost,
  close,
}: {
  postId: string;
  openEditPost: () => void;
  close: () => void;
}) => {
  const navigate = useNavigate();
  const myUserName = useContext(UserNameContext);
  const { data: post, isSuccess: isPostSuccess } = useGetPost(postId);
  return (
    <ContainterWeb className="relative flex grow justify-between gap-3 pt-16">
      <img
        src={expand}
        className="absolute inset-5 h-8 cursor-pointer"
        onClick={() => {
          if (isPostSuccess) {
            navigate(`/${myUserName}/post/${post._id}`);
          }
        }}
      />
      <Carousel photoUrls={isPostSuccess ? post.photoUrls : []} />
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
          close={close}
          caption={isPostSuccess ? post.caption : ""}
          mentions={isPostSuccess ? post.mentions : []}
          tags={isPostSuccess ? post.tags : []}
          creationDate={isPostSuccess ? post.creationDate : ""}
        />
        <PostDetailSummary post={post} />
      </div>
    </ContainterWeb>
  );
};

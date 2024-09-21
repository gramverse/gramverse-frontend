import { useNavigate } from "react-router-dom";
import expand from "@asset/svg/expand.svg";
import { ContainterWeb } from "../../components/container";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { PostDetailSummary } from "./post-shared-components/summary-bar";
import { useGetUserProfile } from "../../services/user-page";
import { UserProfileSummary } from "../../components/user-profile-summary";
import { useGetPost } from "../../services/post-details";

export const UserPostModal = ({
  postId,
  userName,
  close,
}: {
  postId: string;
  userName: string;
  close: () => void;
}) => {
  const navigate = useNavigate();
  const { userProfile: user, isSuccess } = useGetUserProfile(userName);
  const { data: post, isSuccess: isPostSuccess } = useGetPost(postId);

  return (
    <ContainterWeb className="relative flex grow justify-between gap-3 pt-16">
      <img
        src={expand}
        className="absolute inset-5 h-8 cursor-pointer"
        onClick={() => {
          if (isSuccess && isPostSuccess && user) {
            navigate(`/${user.userName}/post/${post._id}`);
          }
        }}
      />
      <Carousel photoUrls={isPostSuccess ? post.photoUrls : []} />
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-row justify-between gap-5">
          <UserProfileSummary
            userName={isSuccess && user ? user.userName : ""}
          />
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

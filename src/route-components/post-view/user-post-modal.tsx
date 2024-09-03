import { useNavigate, useParams } from "react-router-dom";
import expand from "../../assets/svg/expand.svg";
import { ContainterWeb } from "../../reusable-components/container";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { PostDetailSummary } from "./post-shared-components/summary-bar";
import { useGetUserProfile } from "../../api-hooks/user-page";
import { UserProfileSummary } from "../../reusable-components/user-profile-summary";
import { useGetPost } from "../../api-hooks/post-details";

export const UserPostModal = ({ postId }: { postId: string }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { userProfile: user } = useGetUserProfile(params.userName ?? "");
  const { data: post } = useGetPost(postId);
  return (
    <ContainterWeb className="relative flex grow justify-between gap-3 pt-16">
      <img
        src={expand}
        className="absolute inset-5 h-8 cursor-pointer"
        onClick={() => {
          navigate(`/${user?.userName}/post/${post?._id}`);
        }}
      />
      <Carousel photoUrls={post?.photoUrls ?? []} />
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-row justify-between gap-5">
          <UserProfileSummary userName={user?.userName ?? ""} />
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

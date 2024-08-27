import { useState } from "react";
// import { Outlet } from "react-router-dom";
import { CommentProps } from "../../common/types/comment";
import { Comment, ViewComments } from "../../reusable-components/comment";
import back from "../../assets/svg/back.svg";
import pen from "../../assets/svg/pen.svg";
import { CarouselMobile } from "./post-shared-components/carousel";
import { ProfileSummary } from "../../reusable-components/profile-summary";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../reusable-components/button";
import { useGetPost } from "../../api-hooks/post-details";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { PostDetailSummary } from "./post-shared-components/summary-bar";

export const PostViewWeb = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post } = useGetPost(params.postId);

  return (
    <div className="flex h-fit justify-between gap-3 self-center">
      <Carousel photoUrls={post?.photoUrls ?? []} />
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-row justify-between gap-5">
          <ProfileSummary />
          <img
            src={pen}
            onClick={() => {
              navigate("edit");
            }}
          />
        </div>
        <PostCaptions
          caption={post?.caption ?? ""}
          mentions={post?.mentions ?? []}
          tags={post?.tags ?? []}
          creationDate={post?.creationDate ?? ""}
        />
        <PostDetailSummary post={post} />
      </div>
      <Outlet />
    </div>
  );
};

export const PostViewMobile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post } = useGetPost(params.postId ?? "");
  const [commentProps, setCommentProps] = useState<CommentProps>({
    parentCommentId: "",
    parentCommentUsername: "",
    postId: post?._id ?? "",
  });
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start bg-primary">
      <div className="mt-2 w-full text-end">
        <img
          src={back}
          alt=""
          className="h-4 self-end p-2"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="absolute h-0 w-[370px] border border-solid border-gray-300 bg-gray-300" />
        <div className="mt-2 flex justify-between">
          <ProfileSummary className="my-1" />
          <Button
            btnColor="transparent"
            onClick={() => {
              navigate("edit");
            }}
          >
            <img className="h-5 self-end" src={pen} alt="" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-start self-start">
        <CarouselMobile photoUrls={post?.photoUrls ?? []} />
        <PostDetailSummary post={post} />
        <PostCaptions
          caption={post?.caption ?? ""}
          mentions={post?.mentions ?? []}
          tags={post?.tags ?? []}
          creationDate={post?.creationDate ?? ""}
        />
        <Comment {...commentProps} />
      </div>
      <ViewComments
        setCommentProps={setCommentProps}
        comments={post?.comments ?? []}
      />
    </div>
  );
};

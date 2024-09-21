import { useState } from "react";
import { CommentFieldProps } from "../../types/comment";
import { AddComment } from "./post-shared-components/add-comment";
import { ViewComments } from "./post-shared-components/view-comments";
import back from "@asset/svg/back.svg";
import pen from "@asset/svg/pen.svg";
import { CarouselMobile } from "./post-shared-components/carousel";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { useGetPost } from "../../services/post-details";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { PostDetailSummary } from "./post-shared-components/summary-bar";
import { UserProfileSummary } from "../../components/user-profile-summary";

export const UserPostViewWeb = () => {
  const params = useParams();
  const { data: post, isSuccess: isPostSuccess } = useGetPost(params.postId);
  const [commentProps, setCommentProps] = useState<CommentFieldProps>({
    parentCommentId: "",
    parentCommentUserName: "",
  });
  return (
    <div className="mt-40 flex flex-col items-end">
      <div className="flex h-fit justify-between gap-3 self-center">
        <Carousel photoUrls={post?.photoUrls ?? []} />
        <div className="flex grow flex-col justify-between gap-3 p-5">
          <div className="flex flex-row justify-between gap-5">
            <UserProfileSummary userName={isPostSuccess ? post.userName : ""} />
          </div>
          <PostCaptions
            caption={isPostSuccess ? post.caption : ""}
            mentions={isPostSuccess ? post.mentions : []}
            tags={isPostSuccess ? post.tags : []}
            creationDate={isPostSuccess ? post.creationDate : ""}
          />
          <PostDetailSummary post={post} />
          <AddComment
            postId={isPostSuccess ? post._id : ""}
            {...commentProps}
          />
        </div>
      </div>
      <ViewComments
        className="mt-5 h-96 w-1/2 self-end"
        setCommentProps={(props: CommentFieldProps) => setCommentProps(props)}
        postId={isPostSuccess ? post._id : ""}
      />
    </div>
  );
};

export const UserPostViewMobile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post, isSuccess: isPostSuccess } = useGetPost(
    params.postId ?? "",
  );
  const [commentProps, setCommentProps] = useState<CommentFieldProps>({
    parentCommentId: "",
    parentCommentUserName: "",
  });
  return (
    <div className="flex h-fit w-fit flex-col justify-start overflow-y-scroll bg-primary">
      <div className="mt-2 text-end">
        <img
          src={back}
          alt=""
          className="h-4 self-end p-2"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="h-0 border border-solid border-gray-300 bg-gray-300" />
        <div className="mt-2 flex justify-between">
          <UserProfileSummary
            className="my-1"
            userName={isPostSuccess ? post.userName : ""}
          />

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
          caption={isPostSuccess ? post.caption : ""}
          mentions={isPostSuccess ? post.mentions : []}
          tags={isPostSuccess ? post.tags : []}
          creationDate={isPostSuccess ? post.creationDate : ""}
        />
        <AddComment postId={isPostSuccess ? post._id : ""} {...commentProps} />{" "}
      </div>
      <div className="px-3">
        <ViewComments
          className="mt-10 h-[300px] grow self-end"
          setCommentProps={(props: CommentFieldProps) => setCommentProps(props)}
          postId={isPostSuccess ? post._id : ""}
        />
      </div>
    </div>
  );
};

import { useState } from "react";
import { AddComment } from "./post-shared-components/add-comment";
import { ViewComments } from "./post-shared-components/view-comments";
import back from "../../assets/svg/back.svg";
import pen from "../../assets/svg/pen.svg";
import { CarouselMobile } from "./post-shared-components/carousel";
import { ProfileSummary } from "../../components/profile-summary";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { useGetPost } from "../../services/post-details";
import { Carousel } from "./post-shared-components/carousel";
import { PostCaptions } from "./post-shared-components/captions";
import { PostDetailSummary } from "./post-shared-components/summary-bar";
import { Modal } from "../../components/modal";
import { EditPost } from "../post/edit-post";
import { CommentFieldProps } from "../../types/comment";

export const PostViewWeb = () => {
  const params = useParams();
  const { data: post, isSuccess } = useGetPost(params.postId);
  const [isEditOpen, OpenEdit] = useState(false);
  const [commentProps, setCommentProps] = useState<CommentFieldProps>({
    parentCommentId: "",
    parentCommentUserName: "",
  });

  return (
    <div className="flex flex-col items-end">
      <div className="flex h-fit justify-between gap-3 self-center">
        <Modal
          isOpen={isEditOpen}
          close={() => {
            OpenEdit(false);
          }}
        >
          <EditPost
            postId={isSuccess ? post._id : ""}
            close={() => {
              OpenEdit(false);
            }}
          />
        </Modal>
        <Carousel photoUrls={post?.photoUrls ?? []} />
        <div className="flex grow flex-col justify-between gap-3 p-5">
          <div className="flex flex-row justify-between gap-5">
            <ProfileSummary />
            <img
              src={pen}
              onClick={() => {
                OpenEdit(true);
              }}
            />
          </div>
          <PostCaptions
            caption={isSuccess ? post.caption : ""}
            mentions={isSuccess ? post.mentions : []}
            tags={isSuccess ? post.tags : []}
            creationDate={isSuccess ? post.creationDate : ""}
          />
          <PostDetailSummary post={post} />
          <AddComment postId={isSuccess ? post._id : ""} {...commentProps} />
        </div>
      </div>
      <ViewComments
        className="mt-5 h-96 w-1/2 self-end"
        setCommentProps={(props: CommentFieldProps) => setCommentProps(props)}
        postId={isSuccess ? post._id : ""}
      />
    </div>
  );
};

export const PostViewMobile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post, isSuccess } = useGetPost(params.postId ?? "");
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
        <CarouselMobile photoUrls={isSuccess ? post.photoUrls : []} />
        <PostDetailSummary post={post} />
        <PostCaptions
          caption={isSuccess ? post.caption : ""}
          mentions={isSuccess ? post.mentions : []}
          tags={isSuccess ? post.tags : []}
          creationDate={isSuccess ? post.creationDate : ""}
        />
        <AddComment postId={isSuccess ? post._id : ""} {...commentProps} />
      </div>
      <div className="px-3">
        <ViewComments
          className="mt-10 h-[300px] grow self-end"
          setCommentProps={(props: CommentFieldProps) => setCommentProps(props)}
          postId={isSuccess ? post._id : ""}
        />
      </div>
    </div>
  );
};

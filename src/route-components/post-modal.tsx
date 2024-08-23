import { HTMLAttributes, useState } from "react";
import { ProfileSummary } from "../reusable-components/profile-summary";
import { PostDetail } from "../common/types/post";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "../reusable-components/button";
import leftArrow from "../assets/svg/arrow.svg";
import pen from "../assets/svg/pen.svg";
import dot from "../assets/svg/dot.svg";
import PlusIcon from "../assets/svg/plus.svg";
import clsx from "clsx";
import back from "../assets/svg/back.svg";
import { ContainterWeb } from "../reusable-components/container";
import { useGetPost } from "../api-hooks/post";
import { replaceEmojiCodes } from "../reusable-components/emoji/emoji-utilities";
import { Comment, ViewComments } from "../reusable-components/comment";
import { CommentProps } from "../common/types/comment";
import { getTimeDifference } from "../utilitis.ts/time-difference";

interface Captions
  extends Pick<PostDetail, "creationDate" | "mentions" | "caption" | "tags"> {}
interface Carousel
  extends HTMLAttributes<HTMLDivElement>,
    Pick<PostDetail, "photoUrls"> {}
const PostCaptions = (props: Captions) => {
  const { tags: hashtags, caption, mentions, creationDate, ...rest } = props;
  const date = new Date(creationDate);
  const now = new Date();
  return (
    <section className={clsx("flex flex-col gap-8 px-3")} {...rest}>
      <small>{getTimeDifference(now, date)}</small>
      <p className="text-sm">{caption}</p>
      <div lang="fa" dir="rtl">
        {hashtags?.map((hashtag) => (
          <span key={hashtag} className="m-2 rounded-lg bg-red-100 p-2">
            {hashtag}
          </span>
        ))}
      </div>
      <div className="flex w-fit flex-wrap text-xs">
        {mentions?.map((mention) => (
          <span
            key={mention}
            className="m-2 rounded-lg bg-emerald-200 p-2 text-xs"
          >
            {mention}
          </span>
        ))}
      </div>
    </section>
  );
};
const Carousel = (props: Carousel) => {
  const { photoUrls: photoUrls, ...rest } = props;
  const [index, setIndex] = useState(0);
  return (
    <div className="flex items-center justify-between" {...rest}>
      {photoUrls.length > 0 && (
        <img
          src={leftArrow}
          alt=""
          className="z-20 mx-2 h-9 rotate-180 cursor-pointer rounded-lg bg-white p-2 opacity-45"
          onClick={() => {
            if (index > 0) {
              setIndex((index) => index - 1);
            }
          }}
        />
      )}
      <img
        src={photoUrls[index]}
        alt=""
        className="h-[375px] w-[600px] rounded-3xl"
      />
      {photoUrls.length > 0 && (
        <img
          src={leftArrow}
          alt=""
          className="z-20 mx-2 h-9 cursor-pointer rounded-lg bg-white p-2 opacity-45"
          onClick={() => {
            if (index < photoUrls.length - 1) {
              setIndex((index) => index + 1);
            }
          }}
        />
      )}
    </div>
  );
};

const CarouselIndicator = ({
  count,
  index,
}: {
  count: number;
  index: number;
}) => {
  const indicatorArray = Array(count).fill(0);
  indicatorArray[index] = 1;
  return (
    <div className="absolute bottom-4 flex items-center gap-2">
      {indicatorArray.map((val, index) => {
        if (val) {
          return (
            <img
              key={index}
              src={dot}
              className="h-3 rounded-full border-2 border-solid border-gray-400"
            />
          );
        } else {
          return <img src={dot} className="h-3" />;
        }
      })}
    </div>
  );
};
const CarouselMobile = (props: Carousel) => {
  const { photoUrls: photoUrls, ...rest } = props;
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-56 w-full" {...rest}>
        {photoUrls.length > 0 && (
          <img
            src={leftArrow}
            alt=""
            className="absolute inset-y-0 right-0 z-10 mx-1 h-3 rotate-180 cursor-pointer self-center rounded-full bg-white p-1 opacity-75"
            onClick={() => {
              if (index > 0) {
                setIndex((index) => index - 1);
              }
            }}
          />
        )}
        <img
          src={photoUrls[index]}
          alt=""
          className="absolute -inset-x-6 top-0 h-56 object-cover object-center"
        />
        {photoUrls.length > 0 && (
          <img
            src={leftArrow}
            alt=""
            className="absolute inset-y-0 left-0 z-10 mx-1 h-3 cursor-pointer self-center rounded-full bg-white p-1 opacity-75"
            onClick={() => {
              if (index < photoUrls.length - 1) {
                setIndex((index) => index + 1);
              }
            }}
          />
        )}
      </div>
      <CarouselIndicator count={photoUrls.length} index={index} />
    </div>
  );
};

export const PostModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post } = useGetPost(params.id);

  return (
    <ContainterWeb className="relative m-20 flex grow justify-between gap-3">
      {post && (
        <>
          <Carousel photoUrls={post.photoUrls} />
          <img
            src={PlusIcon}
            onClick={() => {
              navigate(-1);
            }}
            className="absolute inset-5 m-0 h-4 w-4 rotate-45 rounded-full bg-secondary p-2 shadow-sm shadow-gray-500"
            alt=""
          />
          <div className="flex grow flex-col gap-3 p-5">
            <div className="flex flex-row justify-between">
              <ProfileSummary />
              <Button
                onClick={() => {
                  navigate("edit");
                }}
              >
                ویرایش پست
              </Button>
            </div>
            <PostCaptions
              caption={replaceEmojiCodes(post.caption)}
              mentions={post.mentions}
              tags={post.tags}
              creationDate={post.creationDate}
            />
          </div>
          <Outlet />
        </>
      )}
    </ContainterWeb>
  );
};

export const PostViewMobile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post } = useGetPost(params.id);
  const [commentProps, setCommentProps] = useState<CommentProps>({
    parentCommentId: "",
    parentCommentUsername: "",
    postId: post?._id ?? "",
  });
  console.log(post);
  return (
    <div className="absolute inset-0 flex grow flex-col bg-primary">
      <img
        src={back}
        alt=""
        className="my-3 h-5 p-2"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="h-0.5 w-full border border-solid border-gray-300"></div>

      {post && (
        <>
          <div className="flex flex-row justify-between">
            <ProfileSummary className="my-1" />
            <Button
              btnColor="transparent"
              onClick={() => {
                navigate("edit");
              }}
            >
              <img src={pen} alt="" />
            </Button>
          </div>

          <CarouselMobile photoUrls={post.photoUrls} />
          <PostCaptions
            caption={replaceEmojiCodes(post.caption)}
            mentions={post.mentions}
            tags={post.tags}
            creationDate={post.creationDate}
          />
          <Comment {...commentProps} />
          <ViewComments
            setCommentProps={setCommentProps}
            comments={post.comments}
          />
        </>
      )}
    </div>
  );
};

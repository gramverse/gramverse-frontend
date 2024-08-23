import { useParams } from "react-router-dom";
import { useGetPost, useLikePost } from "../../api-hooks/view-post";
import { Button } from "../../reusable-components/button";
import { useGetProfile } from "../../api-hooks/get-my-profile";
import PersonIcon from "../../assets/svg/profile.svg";
import editPencil from "../../assets/svg/edit-pencil.svg";
import comment from "../../assets/svg/comment.svg";
import { Like } from "../../reusable-components/like";
import { Bookmark } from "../../reusable-components/bookmark";
import { useState } from "react";
import { getPersianDatePast } from "../../common/utilities/date-time";

type ViewPostProps = {
  postId: string;
};

const ViewPostLayout = ({ postId }: ViewPostProps) => {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
    undefined,
  );
  let persianDateAgo = {
    dateNumber: "",
    agoScale: "دقایقی پیش",
  };
  const {
    data: profile,
    // error: profileError,
    // isError: isProfileError,
    // refetch,
  } = useGetProfile();

  const {
    data: post,
    error: getPoswtError,
    isError: isGetPostError,
    isSuccess: isGetPostSuccess,
    //refetch: refetchPost,
  } = useGetPost(postId);
   
  if(isGetPostError){
   //user error handler
    console.log('isGetPostError', getPoswtError);

  }
  if (isGetPostSuccess) {
    persianDateAgo = getPersianDatePast(post?.creationDate ?? new Date());
  }

  const { mutate: LikeMutate } = useLikePost();

  // if(isGetPostSuccess){
  //   setIsLiked(post.isLiked);
  //   setIsBookmarked(post.isBookmarked);
  // }
  const isSetProfileImage =
    profile?.profileImage && profile?.profileImage != "";

  // if (isGetPostError) {
  //   //use error handler
  //   console.log(getPoswtError);
  // }

  return (
    <div className="flex flex-col bg-form-bg">
      <div className="w-[520px]">
        <div className="flex w-[520px] flex-row py-4">
          <div className="flex w-[385px] flex-row items-center">
            <label className="ml-4 block h-12 w-12 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src={isSetProfileImage ? profile.profileImage : PersonIcon}
              />
            </label>
            <div className="text-sm font-normal">{`${profile?.userName}@`}</div>
          </div>
          <div className="flex w-32 flex-col items-end justify-center">
            <Button
              type="submit"
              onClick={() => {
                // setModal(
                //   post&&
                //     <CreatePost
                //      // onClose={() => setModal(null)}
                //      // post={post}
                //      // onRefetch={() => refetchPost()}
                //     />
                // );
              }}
            >
              <img src={editPencil} />
              <span className="mr-2">{"ویرایش پست"}</span>
            </Button>
          </div>
        </div>
        {/* slide show beshe */}
        <div className="h-[376px] w-[520px] rounded-t-3xl bg-neutral-400">
          <img className="w-full h-full object-cover" src={post?.photoUrls[0]} />
        </div>
        <div className="flex w-[520px] flex-col">
          {post && (
            <p className="text-xs">{`${persianDateAgo.dateNumber} ${persianDateAgo.agoScale}`}</p>
          )}
          <div>{post && post.caption}</div>
          <div lang="fa" dir="rtl" className="flex flex-row flex-wrap">
            {post?.tags?.map((tag) => (
              <p
                key={tag}
                className="m-2 w-fit rounded-lg bg-red-100 p-2 leading-6"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mr-auto flex w-[520px] flex-col">
        <div className="flex h-[61px] flex-row items-center justify-end gap-4">
          <div className="ml-2 flex flex-col items-center">
            {post && <img src={comment} />}
            <p className="text-xs">{post?.commentsCount}</p>
          </div>
          <div className="ml-2 flex flex-col">
            {post && (
              <Bookmark
                defaultValue={post.isBookmarked}
                isBookmarked={isBookmarked}
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  //bookmarkMutate({postId:post._id, isLike:likeValue?? false});
                }}
              />
            )}
            <p className="text-xs">{post?.bookmarksCount}</p>
          </div>
          <div className="ml-4 flex flex-col items-center">
            {post && (
              <Like
                defaultValue={post.isLiked}
                isLiked={isLiked}
                onClick={() => {
                  const likeValue = isLiked == undefined ? true : !isLiked;
                  setIsLiked(likeValue);
                  LikeMutate({ postId: post._id, isLike: likeValue ?? false });
                }}
              />
            )}
            <p className="text-xs">{post?.likesCount}</p>
          </div>
        </div>
        <div className="">comment component</div>
      </div>
    </div>
  );
};

export const ViewPost = () => {
  const { postId } = useParams();
  return (
    <ViewPostLayout postId={postId ?? ""} />

    //   <ContainterWeb>
    //   <UserPageLayout userName={userName} />
    // </ContainterWeb>
  );
};

export const ViewPostMobile = () => {
  //const { postId } = useParams();
  return (
    <>
      {/* <ContainterMobile>
          <UserPageLayout userName={userName} />
        </ContainterMobile> */}
    </>
  );
};

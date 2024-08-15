import { Button } from "../../reusable-components/button";
import PersonIcon from "../../assets/svg/profile.svg";
import { EmptyGallery } from "./empty-gallery";
import { Gallery } from "./gallery";
import { useGetAppUserInfo, useGetPosts } from "../../api-hooks/my-page";
import { ViewAppUserInfo } from "../view-app-user-info";
import { useState } from "react";
import { Modal } from "../../reusable-components/modal";
import { EditProfile } from "../edit-profile";
//import EmptyGallery from "./empty-gallery"

const MyPageLayout = () => {
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const closeEditProfile = () => {
    setIsOpenEditProfile(false);
  };
  let {
    data: userInfo,
    error: userInfoError,
    isError: isUserInfoError,
    isLoading: isUserInfoLoading,
  } = useGetAppUserInfo(); //change let to const
  let {
    data: posts,
    error: postError,
    isError: isPostError,
    isLoading: isPostLoading,
  } = useGetPosts(); //change let to const

  if (isUserInfoLoading || isPostLoading) {
    //show loader
  }
  if (isUserInfoError) {
    //alert userInfoError
  }
  if (isPostError) {
    //alert postError
  }

  //////////////////test block
  userInfo = {
    userName: "@mahmz",
    fullName: "مهشید منزه",
    bio: " Lover, not a fighter, spreading ✌️all over the 🌎",
    followerCount: 13,
    followingCount: 7,
    postCount: 19,
  };
  /////////////////test block

  const noPost = false;
  return (
    <div className="bgColor flex flex-col gap-8">
      {isOpenEditProfile && (
        <Modal>
          <EditProfile  onClose={closeEditProfile} />
        </Modal>
      )}

      <div className="h-14 w-[360px] gap-2">
        <p className="size-5 h-12 w-[117px] text-right font-bold leading-8">
          صفحه من
        </p>
      </div>
      <div className="flex w-[952px] flex-row items-center gap-8">
        <div className="w-[133px]">
          <label className="block h-[133px] w-[133px] rounded-full">
            <img className="h-full w-full" src={PersonIcon} />
          </label>
        </div>
        {userInfo && <ViewAppUserInfo userInfo={userInfo} followMode={true} />}

        <div className="flex h-40 w-[377px] flex-col items-end justify-center">
          <Button
            classes="w-48"
            type="submit"
            onClick={() => {
              setIsOpenEditProfile(true);
            }}
          >
            ویرایش پروفایل
          </Button>
        </div>
      </div>
      <div>
        {!posts && <EmptyGallery />}
        {posts && <Gallery posts={undefined} />}
      </div>
    </div>
  );
};

export const MyPage = () => {
  return (
    <>
      <MyPageLayout />
    </>
  );
};

export const MyPageMobile = () => {
  return (
    <>
      <MyPageLayout />
    </>
  );
};

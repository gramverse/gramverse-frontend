import { Button } from "../../reusable-components/button";
import { EmptyGallery, EmptyGalleryMobile } from "./empty-gallery";
import { Gallery, GalleryMobile } from "./gallery";
import { useGetProfile } from "../../api-hooks/my-page";
import { AccountInfo, AccountInfoMobile } from "./account-info";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalMobile } from "../../reusable-components/modal";
import { EditProfile, EditProfileMoblie } from "../edit-profile";
import { FollowerList } from "../followinger-list/follower-list";
import { FollowingList } from "../followinger-list/following-list";

const MyPageLayout = () => {
  const {
    data: profile,
    error: profileError,
    isError: isProfileError,
  } = useGetProfile();

  const thereIsNoPost = !profile || (profile && profile.postCount == 0);
  const [isEditProfileOpen, openEditProfile] = useState(false);
  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);

  if (isProfileError) {
    // user error handler
    console.log("just for build err", profileError);
  }

  return (
    <div className="mt-9 flex grow flex-col gap-8 bg-primary">
      <Modal
        isOpen={isEditProfileOpen}
        close={() => {
          openEditProfile(false);
        }}
      >
        <EditProfile
          close={() => {
            openEditProfile(false);
          }}
        />
      </Modal>
      {profile && (
        <Modal
          isOpen={isOpenFollowerList}
          close={() => {
            setOpenFollowerList(false);
          }}
        >
          <FollowerList
            userName={profile.userName}
            close={() => {
              setOpenFollowerList(false);
            }}
          />
        </Modal>
      )}
      {profile && (
        <Modal
          isOpen={isOpenFollowingList}
          close={() => {
            setOpenFollowingList(false);
          }}
        >
          <FollowingList
            userName={profile.userName}
            close={() => {
              setOpenFollowingList(false);
            }}
          />
        </Modal>
      )}

      <p className="text-right text-xl font-extrabold leading-8">{"صفحه من"}</p>
      <div className="flex h-44 flex-col gap-3 border border-x-0 border-t-0 border-solid border-form-border pb-8">
        <div className="flex h-40 flex-row items-center gap-8">
          {profile && (
            <AccountInfo
              accountInfo={profile}
              onShowFollowingList={() => setOpenFollowingList(true)}
              onShowFollowerList={() => setOpenFollowerList(true)}
            />
          )}
          {!profile && (
            <>
              <div className="w-[8.31rem]"></div>
              <div className="flex h-40 w-[23.5rem] flex-col justify-start gap-4"></div>
            </>
          )}
          <div className="flex h-40 w-[23.5rem] flex-col items-end justify-center">
            <Button
              classes="w-48"
              type="button"
              onClick={() => {
                openEditProfile(true);
              }}
            >
              ویرایش پروفایل
            </Button>
          </div>
        </div>
      </div>
      <div>
        {thereIsNoPost && <EmptyGallery />}
        {!thereIsNoPost && <Gallery />}
      </div>
      <Outlet />
    </div>
  );
};

export const MyPage = () => {
  return <MyPageLayout />;
};

export const MyPageMobile = () => {
  const {
    data: profile,
    error: profileError,
    isError: isProfileError,
  } = useGetProfile();

  const thereIsNoPost = !profile || (profile && profile.postCount == 0);
  if (isProfileError) {
    //use error handler
    console.log("just for build err", profileError);
  }

  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex grow flex-col items-center justify-start gap-4">
      <ModalMobile
        isOpen={isEditOpen}
        close={() => {
          setIsEditOpen(false);
        }}
      >
        <EditProfileMoblie
          close={() => {
            setIsEditOpen(false);
          }}
        />
      </ModalMobile>
      <div className="flex flex-col gap-6 border border-x-0 border-t-0 border-solid border-form-border">
        {profile && <AccountInfoMobile accountInfo={profile} />}
        <Button
          classes="my-2 w-full text-center justify-center"
          type="button"
          onClick={() => {
            setIsEditOpen(true);
          }}
        >
          ویرایش پروفایل
        </Button>
      </div>
      <div>
        {thereIsNoPost && <EmptyGalleryMobile />}
        {!thereIsNoPost && <GalleryMobile />}
      </div>
      <Outlet />
    </div>
  );
};

import { Button } from "../../components/button";
import { EmptyGallery, EmptyGalleryMobile } from "./empty-gallery";
import { Gallery, GalleryMobile } from "./gallery";
import { useGetProfile } from "../../services/my-page";
import { AccountInfo, AccountInfoMobile } from "./account-info";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalMobile } from "../../components/modal";
import { EditProfile, EditProfileMoblie } from "./edit-profile";
import { FollowerList } from "../followinger-list/follower-list";
import { FollowingList } from "../followinger-list/following-list";

const MyPageLayout = () => {
  const { data: profile, isSuccess } = useGetProfile();

  const [isEditProfileOpen, openEditProfile] = useState(false);
  const [isOpenFollowerList, setOpenFollowerList] = useState(false);
  const [isOpenFollowingList, setOpenFollowingList] = useState(false);

  return (
    <div className="flex h-full w-[64rem] flex-col gap-3 pt-36">
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
        {isSuccess && profile.postCount === 0 && <EmptyGallery />}
        {isSuccess && profile.postCount > 0 && <Gallery />}
      </div>
      <Outlet />
    </div>
  );
};

export const MyPage = () => {
  return <MyPageLayout />;
};

export const MyPageMobile = () => {
  const { data: profile, isSuccess } = useGetProfile();

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
        {isSuccess && profile.postCount === 0 && <EmptyGalleryMobile />}
        {isSuccess && profile.postCount > 0 && <GalleryMobile />}
      </div>
      <Outlet />
    </div>
  );
};

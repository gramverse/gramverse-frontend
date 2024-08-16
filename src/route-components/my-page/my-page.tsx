import { Button } from "../../reusable-components/button";
import PersonIcon from "../../assets/svg/profile.svg";
import { EmptyGallery } from "./empty-gallery";
import { Gallery } from "./gallery";
import { useGetPosts, useGetProfile } from "../../api-hooks/my-page";
import { ViewAppUserInfo } from "../view-app-user-info";
import { useState } from "react";
import { Modal } from "../../reusable-components/modal";
import { EditProfile } from "../edit-profile";
import { createPortal } from "react-dom";

const MyPageLayout = () => {
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);

  const {
    data: profileData,
    error: profileError,
    isError: isProfileError,
    isLoading: isProfileLoading,
    isSuccess,
    refetch,
  } = useGetProfile();
  const {
    data: posts,
    error: postError,
    isError: isPostError,
    isLoading: isPostLoading,
  } = useGetPosts();

  const thereIsNoPost = !posts || (posts && posts.length == 0);
  if (isSuccess) {
    console.log(profileData);
  }
  if (isProfileLoading || isPostLoading) {
    //show loader
  }
  if (isProfileError) {
    //alert userInfoError
    console.log("dataaa", profileData);
    console.log("error", profileError);
  }
  if (isPostError) {
    //alert postError
  }
  // posts = [
  //   {
  //     id: 1,
  //     caption: "chert1",
  //     creationDate: new Date(),
  //     photoUrls: [
  //       "https://cdn.mos.cms.futurecdn.net/4UdEs7tTKwLJbxZPUYR3hF-650-80.jpg.webp",
  //       // "https://www.google.com/imgres?q=beaver&imgurl=https%3A%2F%2Fwww.humanesociety.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F768x326%2Fpublic%2F2022-09%2Fbeaver-303232.jpg%3Fh%3D732c8f13%26itok%3D4u_U4luA&imgrefurl=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fwhat-do-about-beavers&docid=L_5U5zLwiPzAFM&tbnid=s-oJgNquhWHkpM&vet=12ahUKEwiZqYWxsfeHAxXORPEDHXkUEi0QM3oECBgQAA..i&w=768&h=326&hcb=2&ved=2ahUKEwiZqYWxsfeHAxXORPEDHXkUEi0QM3oECBgQAA",
  //       // "https://www.google.com/imgres?q=beaver&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1308823982%2Fvector%2Fcartoon-happy-beaver.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3D90tn3vJxNmWbSm_khb_x1TAsAU9aQaTBihx6mCiXz2A%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fvector%2Fcartoon-happy-beaver-gm1308823982-398703699&docid=BMxuSARBnz7w-M&tbnid=EWNHhY-8vZxlxM&vet=12ahUKEwiZqYWxsfeHAxXORPEDHXkUEi0QM3oECFoQAA..i&w=612&h=612&hcb=2&ved=2ahUKEwiZqYWxsfeHAxXORPEDHXkUEi0QM3oECFoQAA",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     caption: "chert2",
  //     creationDate: new Date(),
  //     photoUrls: [
  //       "https://www.google.com/imgres?q=cute%20seal%20fish&imgurl=https%3A%2F%2Fwww.photocase.com%2Fphotos%2F3330211-it-smells-like-seal-baby-fish-animal-photocase-stock-photo-large.jpeg&imgrefurl=https%3A%2F%2Fwww.photocase.com%2Fphotos%2F3330211-it-smells-like-seal-baby-fish-animal-photocase-stock-photo&docid=lP7rbtF2ypBldM&tbnid=uOw2T0wj3DcftM&vet=12ahUKEwjju736sfeHAxWNR_EDHUGxM5YQM3oECHsQAA..i&w=800&h=582&hcb=2&ved=2ahUKEwjju736sfeHAxWNR_EDHUGxM5YQM3oECHsQAA",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     caption: "chert3",
  //     creationDate: new Date(),
  //     photoUrls: [
  //       "https://www.google.com/imgres?q=clown%20fish&imgurl=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2F4UdEs7tTKwLJbxZPUYR3hF-1200-80.jpg&imgrefurl=https%3A%2F%2Fwww.livescience.com%2F55399-clownfish.html&docid=Ct1AETz0xnKxSM&tbnid=v1idhDqW94TuzM&vet=12ahUKEwj0yryXsveHAxWUBdsEHdwlGzQQM3oECBwQAA..i&w=1000&h=667&hcb=2&ved=2ahUKEwj0yryXsveHAxWUBdsEHdwlGzQQM3oECBwQAA",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     caption: "chert4",
  //     creationDate: new Date(),
  //     photoUrls: [
  //       "https://www.google.com/imgres?q=colorful%20fish&imgurl=https%3A%2F%2Fst2.depositphotos.com%2F1000619%2F8544%2Fi%2F950%2Fdepositphotos_85449368-stock-photo-colorful-fish-in-aquarium.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fphoto%2Fcolorful-fish-in-aquarium-85449368.html&docid=27t6VN9AIBNfvM&tbnid=UV6c_mZZNJ6eZM&vet=12ahUKEwix3ZS-sveHAxX0cfEDHT28MQ4QM3oECFkQAA..i&w=1023&h=795&hcb=2&ved=2ahUKEwix3ZS-sveHAxX0cfEDHT28MQ4QM3oECFkQAA",
  //     ],
  //   },
  // ];
  return (
    <div className="bgColor flex flex-col gap-8">
      {isOpenEditProfile && profileData && (
        <Modal>
          <EditProfile
            profile={profileData}
            onClose={() => setIsOpenEditProfile(false)}
            onRefetch={() => refetch()}
          />
        </Modal>
      )}

      <div className="h-14 w-[360px] gap-2">
        <p className="size-5 h-12 w-[117px] text-right font-bold leading-8">
          صفحه من
        </p>
      </div>
      <div className="flex h-[180px] w-[952px] flex-col gap-3 border border-x-0 border-t-0 border-solid border-form-border">
        <div className="flex h-[160px] w-[952px] flex-row items-center gap-8">
          {profileData && <ViewAppUserInfo userInfo={profileData} />}
          {!profileData && (
            <>
              <div className="w-[133px]"></div>
              <div className="flex h-40 w-[377px] flex-col justify-start gap-4"></div>
            </>
          )}
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
      </div>
      <div>
        {thereIsNoPost && <EmptyGallery />}
        {!thereIsNoPost && <Gallery posts={posts} />}
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

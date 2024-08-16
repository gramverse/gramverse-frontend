import { useParams } from "react-router-dom";
import { ViewAppUserInfo } from "./view-app-user-info";
import {
  useFollow,
  useGetFollowingProfile,
  useUnFollow,
} from "../api-hooks/follow";
import { FollowingProfile } from "../common/types/following-profile";


export const FollowUserLayout = () => {
  //implement web and mobile
  const { userName } = useParams();
  console.log("az routeeee", userName);
  const {
    data: userInfo,
    error: profileError,
    isError: isProfileError,
    isLoading: isProfileLoading,
    isSuccess: isGetProfileSuccess,
    refetch,
  } = useGetFollowingProfile(userName ?? "");
  //1- chikar konim ino k motmaen username shim data dare?

  const {
    isError: isFollowError,
    error: followError,
    isSuccess: isFollowSuccess,
    mutate: followMutate,
  } = useFollow();
  const {
    isError: isUnFollowError,
    error: unFollowError,
    isSuccess: isUnFollowSuccess,
    mutate: unFollowMutate,
  } = useUnFollow();


  const onFollowMethod = userInfo?.isFollowed ? unFollowMutate : followMutate;

  if (isProfileLoading) {
    //show loader
  }
  if (isProfileError) {
    //alert userInfoError
    alert(profileError);
    console.log("error", profileError);
  }
  if (isUnFollowError) {
    //alert postError
  }
  if (isFollowError) {
    //alert postError
  }

  return (
    <>
      <div className="flex h-[180px] w-[952px] flex-col gap-3 border border-x-0 border-t-0 border-solid border-form-border">
        <div className="flex h-[160px] w-[952px] flex-row items-center gap-8">
          {userInfo && (
            <ViewAppUserInfo
              followMode
              userInfo={userInfo}
              isFollowed={userInfo.isFollowed}
              onFollowMethod={onFollowMethod}
            />
          )}

          <div className="flex h-40 w-[377px] flex-col items-end justify-center gap-[3px]">
            <div className="h-[8px] w-[8px] rounded-full bg-submit-btn"></div>
            <div className="h-[8px] w-[8px] rounded-full bg-submit-btn"></div>
            <div className="h-[8px] w-[8px] rounded-full bg-submit-btn"></div>
          </div>
        </div>
      </div>
    </>
  );
};


export const FollowUser = () => {
  return (
    <>
      <FollowUserLayout />
    </>
  );
};

export const FollowUserMobile = () => {
  return (
    <>
      <FollowUserLayout />
    </>
  );
};
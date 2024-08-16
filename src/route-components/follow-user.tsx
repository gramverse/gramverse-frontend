import { useParams } from "react-router-dom";
import { ViewAppUserInfo } from "./view-app-user-info";

const userInfo = {
  bio: "aaa",
  email: "bb",
  followerCount: 1000,
  followingCount: 100,
  isPrivate: true,
  postCount: 10,
  userName: "",
  firstName: "متین",
  lastName: "دهقان",
  profileImage:
    "https://img.freepik.com/premium-photo/30-years-old-cute-young-woman-portrait-face_923558-9927.jpg?size=626&ext=jpg&ga=GA1.1.438475375.1723783343&semt=ais_hybrid",
};
export const FollowUser = () => {
  //implement web and mobile
  const { username } = useParams();
  userInfo.userName = username ?? "";

  console.log(username);

  return (
    <>
      <div className="flex h-[180px] w-[952px] flex-col gap-3 border border-x-0 border-t-0 border-solid border-form-border">
        <div className="flex h-[160px] w-[952px] flex-row items-center gap-8">
          <ViewAppUserInfo
            followMode
            userInfo={userInfo}
            isFollowed
          />

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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProfile } from "../api-hooks/get-profile";
import { MyPage, MyPageMobile } from "./my-page/my-page";
import { FollowUser, FollowUserMobile } from "./follow-user";
import { useSetTab } from "./main/outlet-context";
export const UserOrProfile = () => {
  const { userName } = useParams();
  const { data, isSuccess, isLoading } = useGetProfile();
  const [myPage, setMyPage] = useState(true);
  const { setTab } = useSetTab();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (userName === data?.userName) {
        setMyPage(true);
        setTab("myPage");
      } else {
        setMyPage(false);
        // setTab("search");
      }
    }
  }, [data, data?.userName, isLoading, isSuccess, setTab, userName]);
  return <>{myPage ? <MyPage /> : <FollowUser userName={userName ?? ""} />}</>;
};

export const UserOrProfileMobile = () => {
  const { data } = useGetProfile();
  const [myPage, setMyPage] = useState(true);
  const { userName } = useParams();
  useEffect(() => {
    if (userName === data?.userName) {
      setMyPage(true);
    } else {
      setMyPage(false);
    }
  }, [data?.userName, userName]);
  return (
    <>
      {myPage ? (
        <MyPageMobile />
      ) : (
        <FollowUserMobile userName={userName ?? "s"} />
      )}
    </>
  );
};

import { useParams } from "react-router-dom";
const MyPageButton = () => {
  const params = useParams();
  return <div>welcome {params.username}</div>;
};

export const MyPage = () => {
  return (
    <>
      <MyPageButton />
    </>
  );
};

export const MyPageMobile = () => {
  return (
    <>
      <MyPageButton />
    </>
  );
};

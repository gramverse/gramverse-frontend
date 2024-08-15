import { useLocation, useParams } from "react-router-dom";
const MyPageButton = () => {
  const {state} = useLocation();
  return <div>welcome {state.username}</div>;
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

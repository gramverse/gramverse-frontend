import { SubmitBtn } from "../reusable-components/submit-btn";
// import { useNavigate } from "react-router-dom";
// import { urls } from "../common/routes";
const MyPageButton = () => {
  // const navigate = useNavigate();
  return <SubmitBtn onClick={() => {}}>ویرایش پروفایل</SubmitBtn>;
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

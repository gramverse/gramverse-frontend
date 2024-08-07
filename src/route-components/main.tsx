import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <>
      <h1>main</h1>
      <Outlet></Outlet>
    </>
  );
};

export const MainMobile = () => {
  return (
    <>
      <h1>main</h1>
      <Outlet></Outlet>
    </>
  );
};

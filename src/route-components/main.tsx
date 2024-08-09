import { Outlet, useLocation } from "react-router-dom";

export const Main = () => {
  const { state } = useLocation();
  return (
    <>
      <h1>hello{state.username}</h1>
      <Outlet></Outlet>
    </>
  );
};

export const MainMobile = () => {
  const { state } = useLocation();
  return (
    <>
      <h1>hello{state.username}</h1>
      <Outlet></Outlet>
    </>
  );
};

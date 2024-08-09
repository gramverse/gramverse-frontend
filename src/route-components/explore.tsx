import { useLocation } from "react-router-dom";

export const Explore = () => {
  const location = useLocation();


  return (
    <>
      <h1>{location.state.username}</h1>
    </>
  );
};

export const ExploreMobile = () => {
  return (
    <>
      <h1>explore</h1>
    </>
  );
};

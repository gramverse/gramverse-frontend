import "./assets/styles/App.css";
import { AppRoutes, AppRoutesMobile } from "./app-routes";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const mobile = useMediaQuery("(max-width:375px)");

  return (
    <>
      {mobile && <AppRoutesMobile></AppRoutesMobile>}
      {!mobile && <AppRoutes></AppRoutes>}
    </>
  );
}

export default App;

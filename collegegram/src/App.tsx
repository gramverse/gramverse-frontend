import "./assets/styles/App.css";
import { AppRoutes, AppRoutesMobile } from "./appRoutes";
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

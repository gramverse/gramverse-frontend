import "./assets/styles/App.css";
import { AppRoutes, AppRoutesMobile } from "./app-routes";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();
function App() {
  const [mobile, setMobile] = useState(
    window.matchMedia("(max-width:375px)").matches
  );
  window.addEventListener("resize", () => {
    setMobile(window.matchMedia("(max-width:375px)").matches);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div
        lang="fa"
        className="flex w-screen h-screen justify-center items-center"
      >
        {mobile && <AppRoutesMobile></AppRoutesMobile>}
        {!mobile && <AppRoutes></AppRoutes>}
      </div>
    </QueryClientProvider>
  );
}

export default App;

import "./assets/styles/App.css";
import { AppRoutes, AppRoutesMobile } from "./app-routes";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const mobile = useMediaQuery("(max-width:375px)");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {mobile && <AppRoutesMobile></AppRoutesMobile>}
        {!mobile && <AppRoutes></AppRoutes>}
      </QueryClientProvider>
    </>
  );
}

export default App;

import { AppRoutes, AppRoutesMobile } from "./router/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "./common/query-client";

function App() {
  const [mobile, setMobile] = useState(
    window.matchMedia("(max-width:375px)").matches,
  );
  window.addEventListener("resize", () => {
    setMobile(window.matchMedia("(max-width:375px)").matches);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div lang="fa" className="flex h-full w-full items-center justify-center">
        {mobile && <AppRoutesMobile></AppRoutesMobile>}
        {!mobile && <AppRoutes></AppRoutes>}
      </div>
    </QueryClientProvider>
  );
}

export default App;

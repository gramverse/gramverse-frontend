import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          //staleTime: Infinity,
          retryDelay: 1000, 
          retry:3 
        },
      },
  
});

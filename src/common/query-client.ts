import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleRequestError } from "./utilities/http-error-handler";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: Infinity,
      retryDelay: 1000,
      retry: 3,
    },
  },
  queryCache: new QueryCache({
    async onError(error) {
      handleRequestError(error);
    },
  }),
});

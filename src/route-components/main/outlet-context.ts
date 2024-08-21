import { useOutletContext } from "react-router-dom";
import { Post } from "../../common/types/post";

export type ContextType = {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  post: Post | null;
};
export function useMainOutletContext() {
  return useOutletContext<ContextType>();
}

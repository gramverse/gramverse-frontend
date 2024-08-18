import { useOutletContext } from "react-router-dom";

export type ContextType = {
  setTab: React.Dispatch<React.SetStateAction<string>>;
};
export function useSetTab() {
  return useOutletContext<ContextType>();
}

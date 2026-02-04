import { useContext } from "react";
import { PageHeaderContext } from "../layouts/page-header-provider/page-header-provider.types";

export const usePageHeader = () => {
  const ctx = useContext(PageHeaderContext);

  if (!ctx) {
    throw new Error("usePageHeader must be used inside PageHeaderProvider");
  }

  return ctx;
};

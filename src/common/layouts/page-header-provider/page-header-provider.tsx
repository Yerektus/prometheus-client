import { useState } from "react";
import {
  HeaderItemValue,
  PageHeaderContext,
  PageHeaderProviderProps,
} from "./page-header-provider.types";

export const PageHeaderProvider = ({ children }: PageHeaderProviderProps) => {
  const [items, setItems] = useState<HeaderItemValue[]>([]);

  return (
    <PageHeaderContext.Provider value={{ items: items, setItems: setItems }}>
      {children}
    </PageHeaderContext.Provider>
  );
};

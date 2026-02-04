import { createContext } from "react";

export interface HeaderItemValue {
  title: string;
  href: string;
}

interface PageHeaderValue {
  items: HeaderItemValue[];
  setItems: React.Dispatch<React.SetStateAction<HeaderItemValue[]>>;
}

export interface PageHeaderProviderProps {
  children: React.ReactNode;
}

export const PageHeaderContext = createContext<PageHeaderValue | undefined>(
  undefined,
);

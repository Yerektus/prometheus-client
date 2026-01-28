import { paths } from "./paths";

const pageNames: Record<string, string> = {
  [paths.getSensorsPath()]: "Датчики",
};

export const getPageTitleByPath = (pathname: string): string => {
  return pageNames[pathname] ?? "unkown";
};

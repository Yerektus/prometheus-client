import { paths } from "./paths";

const pageNames: Record<string, string> = {
  [paths.getSensorsPath()]: "Датчики",
  [paths.getSensorReadingsPath()]: "Мониторинг показаний датчиков",
};

export const getPageTitleByPath = (pathname: string): string => {
  return pageNames[pathname] ?? "unkown";
};

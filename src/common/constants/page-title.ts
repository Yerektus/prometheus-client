const pageNames: Record<string, string> = {
  sensors: "Датчики",
};

export const getPageTitleByPath = (pathname: string): string => {
  return pageNames[pathname] ?? "unkown";
};

import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { getPageTitleByPath } from "@/common/constants/page-title";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { Skeleton } from "../ui/skeleton";

export const CommonHeader = () => {
  const { items } = usePageHeader();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="mr-2" size={"icon-sm"} />
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <>
              {item.title == "" ? (
                <BreadcrumbItem>
                  <Skeleton className="w-30 h-5" />
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {index != items.length - 1 ? <BreadcrumbSeparator /> : <></>}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

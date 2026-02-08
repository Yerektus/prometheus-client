import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { Skeleton } from "../ui/skeleton";
import { SidebarTrigger } from "../ui/sidebar";

export const CommonHeader = () => {
  const { items } = usePageHeader();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <SidebarTrigger
            size={"icon-lg"}
            variant={"outline"}
            className={"mr-3"}
          />
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

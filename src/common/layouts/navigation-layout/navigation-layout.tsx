import { AppSidebar } from "@/common/components/app-sidebar/app-sidebar";
import { CommonHeader } from "@/common/components/common-header/common-header";
import { SidebarInset, SidebarProvider } from "@/common/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { PageHeaderProvider } from "../page-header-provider/page-header-provider";

export const NavigationLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <PageHeaderProvider>
          <main>
            <CommonHeader />
            <Outlet />
          </main>
        </PageHeaderProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

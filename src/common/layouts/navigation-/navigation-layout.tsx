import { AppSidebar } from "@/common/components/app-sidebar/app-sidebar";
import { CommonHeader } from "@/common/components/common-header/common-header";
import { SidebarInset, SidebarProvider } from "@/common/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export const NavigationLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <CommonHeader />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

import { Home, BrickWallFire, Eye, Users } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/common/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/common/components/ui/sidebar";
import { paths } from "../../constants/paths";

const items = [
  {
    title: "Главная",
    url: paths.getHomePath(),
    icon: Home,
  },
  {
    title: "Датчики",
    url: paths.getSensorsPath(),
    icon: BrickWallFire,
  },
  {
    title: "Мониторинг",
    url: paths.getSensorReadingsPath(),
    icon: Eye,
  },
  {
    title: "Пользователи",
    url: paths.getUsersPath(),
    icon: Users,
  },
];

export function AppSidebar() {
  const { isMobile, setOpen, setOpenMobile } = useSidebar();

  const handleCloseSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
      return;
    }

    setOpen(false);
  };

  return (
    <Sidebar collapsible="offcanvas" variant="floating" overlay>
      <SidebarHeader className="p-2">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleCloseSidebar}
            aria-label="Закрыть боковое меню"
          >
            <X />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

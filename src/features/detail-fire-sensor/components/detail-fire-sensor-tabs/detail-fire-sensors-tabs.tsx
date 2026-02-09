import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import { DetailFireSensorTabsProps } from "./detail-fire-sensos-table.types";
import { ReadingsTabContent } from "../readings-tab-content/readings-tab-content";
import { UsersTabContent } from "../users-tab-content/users-tab-content";

export const DetailFireSensorTabs = ({ data }: DetailFireSensorTabsProps) => {
  const users = data.location?.users ?? [];
  const sensorReadings = data.sensorReadings ?? [];

  return (
    <Card className="rounded-xl border-border/70">
      <CardHeader>
        <CardTitle>Детали</CardTitle>
        <CardDescription>
          История изменений показаний и связанные пользователи
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <Tabs defaultValue="readings" className="flex flex-col">
          <TabsList>
            <TabsTrigger value="readings">Показания</TabsTrigger>
            <TabsTrigger value="users" className="group gap-2">
              <span>Пользователи</span>
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 py-0 text-xs font-semibold text-primary transition-colors group-data-active:bg-primary group-data-active:text-primary-foreground">
                {users.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="readings">
            <ReadingsTabContent sensorReadings={sensorReadings} />
          </TabsContent>

          <TabsContent value="users">
            <UsersTabContent users={users} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFireSensors } from "@/common/api/requests/fire-sensors/fetch-fire-sensors";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { UsersTable } from "../components/users-table/users-table";
import {
  SensorOption,
  UsersTableRow,
} from "../components/users-table/users-table.types";
import { fetchUsersWithFireSensors } from "@/common/api/requests/users/fetch-users-with-fire-sensors";

const getFullName = (firstName: string, lastName: string) => {
  const fullName = [lastName, firstName]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" ");

  return fullName || "—";
};

export const UsersView = () => {
  const location = useLocation();
  const { setItems } = usePageHeader();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersWithFireSensors,
    retry: false,
  });

  const { data: fireSensors = [] } = useQuery({
    queryKey: ["fireSensors"],
    queryFn: fetchFireSensors,
    retry: false,
  });

  const sensorOptions = useMemo<SensorOption[]>(
    () =>
      fireSensors.map((sensor) => ({
        id: sensor.id,
        serialNumber: sensor.serialNumber ?? sensor.id,
        model: sensor.model ?? "",
        label: `${sensor.serialNumber ?? sensor.id}${sensor.model ? ` (${sensor.model})` : ""}`,
      })),
    [fireSensors],
  );

  const usersTableData = useMemo<UsersTableRow[]>(
    () =>
      users.map((user) => {
        console.log(user);
        const fullName = getFullName(user.firstName, user.lastName);
        let fireSensorIds = [] as string[];
        user.locations?.forEach((location) => {
          if (!location.fireSensors) return;
          console.log(
            ...location.fireSensors.map((fireSensor) => fireSensor.id),
          );
          fireSensorIds.push(
            ...location.fireSensors.map((fireSensor) => fireSensor.id),
          );
        });
        console.log(fireSensorIds);
        let sensorSerialNumbers = [] as string[];
        user.locations?.forEach((location) => {
          if (!location.fireSensors) return;
          sensorSerialNumbers.push(
            ...location.fireSensors.map(
              (fireSensor) => fireSensor.serialNumber,
            ),
          );
        });
        let sensorsCount = 0;
        user.locations?.forEach((location) => {
          if (!location.fireSensors) return;
          location.fireSensors.forEach(() => ++sensorsCount);
        });

        return {
          id: user.id,
          fullName,
          username: user.username,
          email: user.email,
          phoneNumbers: user.phoneNumbers,
          roles: user.roles?.map((role) => role.name) ?? [],
          fireSensorIds: fireSensorIds,
          sensorSerialNumbers: sensorSerialNumbers,
          sensorsCount: sensorsCount,
          search: `${fullName} ${user.username}`.toLowerCase(),
          user,
        };
      }),
    [users],
  );

  useEffect(() => {
    setItems([
      {
        title: "Пользователи",
        href: location.pathname,
      },
    ]);
  }, [location.pathname, setItems]);

  return (
    <div className="h-screen w-full px-8 py-4">
      <UsersTable
        data={usersTableData}
        refetch={() => void refetch()}
        sensorOptions={sensorOptions}
      />
    </div>
  );
};

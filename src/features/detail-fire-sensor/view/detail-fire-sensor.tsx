import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { Skeleton } from "@/common/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/ui/tooltip";

import { Copy, MoreHorizontal, Pencil, Power } from "lucide-react";

const TEMP_WARNING_C = 55;
const HUMIDITY_LOW_PCT = 20;
const HUMIDITY_HIGH_PCT = 80;
const GAS_WARNING_PPM = 300;

export function formatDateTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (!text) return false;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.focus();
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/** Типы (User оставлен максимально нейтральным) */
export type User = Record<string, unknown>;

export interface SensorReadingsColumns {
  fireSensorId: string;
  locationId: string;
  country: string;
  city: string;
  address: string;
  serialNumber: string;
  model: string;
  isActive: boolean;
  installedAt: string;
  floor: string;
  flat: string;
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
  recordedAt: string;
  users?: User[];
}

type SensorDetailsPageProps = {
  data?: SensorReadingsColumns | null;

  isLoading?: boolean;
  error?: unknown;

  onRetry?: () => void;
  onEdit?: (fireSensorId: string) => void;
  onToggleActive?: (fireSensorId: string, nextIsActive: boolean) => void;
  onOpenLocation?: (locationId: string) => void;
};

function isBlank(v: unknown) {
  if (v === null || v === undefined) return true;
  if (typeof v !== "string") return false;
  return v.trim().length === 0;
}

function MetricBadge({ variant }: { variant: "ok" | "warning" }) {
  return (
    <Badge
      variant={variant === "warning" ? "destructive" : "secondary"}
      className="ml-auto"
    >
      {variant === "warning" ? "Warning" : "OK"}
    </Badge>
  );
}

function MetricKpi(props: {
  title: string;
  value: React.ReactNode;
  hint: string;
  status: "ok" | "warning";
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm font-medium cursor-help">
              {props.title}
            </span>
          </TooltipTrigger>
          <TooltipContent>{props.hint}</TooltipContent>
        </Tooltip>
        <MetricBadge variant={props.status} />
      </div>
      <div className="mt-2 text-2xl font-semibold">{props.value}</div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-44" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-56 w-full" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export function FireSensorDetailView({
  data = {
    fireSensorId: "0f6d8c3a-3b6a-4c9d-9c2f-6c1c3d1b8a52",
    locationId: "a2b1f0d9-1c7a-4b8d-8a31-52fcb9e1d0d4",
    country: "Казахстан",
    city: "Алматы",
    address: "пр-т Абая, 58",
    serialNumber: "FS-ALM-024913",
    model: "Prometheus FireSense X2",
    isActive: true,
    installedAt: "2025-11-18T09:25:00.000Z",
    floor: "7",
    flat: "52",
    temperatureC: 31.7,
    humidityPct: 44,
    gasPpm: 118,
    recordedAt: "2026-02-03T07:18:32.000Z",
  },
  isLoading = false,
  error,
  onRetry,
  onEdit,
  onToggleActive,
  onOpenLocation,
}: SensorDetailsPageProps) {
  if (isLoading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Alert variant="destructive">
          <AlertTitle>Ошибка загрузки</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span>Не удалось получить данные по датчику.</span>
            <Button onClick={onRetry}>Повторить</Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const hasKeyData = Boolean(data?.fireSensorId && data?.serialNumber);
  if (!data || !hasKeyData) {
    return (
      <div className="p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Нет данных по датчику</CardTitle>
            <CardDescription>
              Проверьте доступность датчика или повторите запрос.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button onClick={onRetry}>Повторить</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusText = data.isActive ? "Работает" : "Не работает";
  const lastRecorded = formatDateTime(data.recordedAt);

  const floorText = isBlank(data.floor) ? "—" : data.floor;
  const flatText = isBlank(data.flat) ? "—" : data.flat;
  const installedText = isBlank(data.installedAt)
    ? "Не установлен"
    : formatDateTime(data.installedAt);

  const tempStatus: "ok" | "warning" =
    data.temperatureC > TEMP_WARNING_C ? "warning" : "ok";
  const humidityStatus: "ok" | "warning" =
    data.humidityPct < HUMIDITY_LOW_PCT || data.humidityPct > HUMIDITY_HIGH_PCT
      ? "warning"
      : "ok";
  const gasStatus: "ok" | "warning" =
    data.gasPpm > GAS_WARNING_PPM ? "warning" : "ok";

  const openLocation = () => {
    if (onOpenLocation) return onOpenLocation(data.locationId);
    window.location.href = `/locations/${data.locationId}`;
  };

  const editSensor = () => {
    if (onEdit) return onEdit(data.fireSensorId);
    window.location.href = `/sensors/${data.fireSensorId}/edit`;
  };

  const toggleActive = () => {
    const next = !data.isActive;
    if (onToggleActive) return onToggleActive(data.fireSensorId, next);
  };

  const users = Array.isArray(data.users) ? data.users : [];
  const usersCount = users.length;

  return (
    <TooltipProvider>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-semibold">
              Датчик {data.serialNumber}
            </div>
            <div className="text-sm text-muted-foreground">{data.model}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <Badge variant={data.isActive ? "secondary" : "destructive"}>
              {statusText}
            </Badge>

            <div className="text-sm text-muted-foreground">
              Последняя запись:{" "}
              <span className="font-medium">{lastRecorded}</span>
            </div>

            <Button onClick={editSensor} className="gap-2">
              <Pencil className="h-4 w-4" />
              Редактировать
            </Button>

            <Button
              variant={data.isActive ? "outline" : "default"}
              onClick={toggleActive}
              className="gap-2"
            >
              <Power className="h-4 w-4" />
              {data.isActive ? "Деактивировать" : "Активировать"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Меню действий"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Действия</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void copyToClipboard(data.fireSensorId)}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Скопировать ID датчика
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void copyToClipboard(data.locationId)}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Скопировать ID локации
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={openLocation}>
                  Открыть локацию
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Локация</CardTitle>
              <CardDescription>
                Адрес установки и доп. параметры
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Страна</span>
                  <span className="font-medium truncate">{data.country}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Город</span>
                  <span className="font-medium truncate">{data.city}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Адрес</span>
                  <span className="font-medium truncate">{data.address}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Этаж</span>
                  <span className="font-medium">{floorText}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Квартира</span>
                  <span className="font-medium">{flatText}</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={openLocation}
                className="w-full"
              >
                Перейти к локации
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Информация о датчике</CardTitle>
              <CardDescription>Идентификаторы и параметры</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Serial number</span>
                  <span className="font-medium truncate">
                    {data.serialNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Модель</span>
                  <span className="font-medium truncate">{data.model}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Установлен</span>
                  <span className="font-medium">{installedText}</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-xs text-muted-foreground">
                    fireSensorId
                  </div>
                  <div className="font-mono text-xs break-all">
                    {data.fireSensorId}
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => void copyToClipboard(data.fireSensorId)}
                      aria-label="Скопировать fireSensorId"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Скопировать ID</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Текущие показания</CardTitle>
              <CardDescription>
                Запись: <span className="font-medium">{lastRecorded}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <MetricKpi
                title="Температура"
                value={
                  <span>
                    {Number.isFinite(data.temperatureC)
                      ? data.temperatureC
                      : "—"}
                    °C
                  </span>
                }
                hint="Температура воздуха возле датчика. Высокие значения могут указывать на возгорание."
                status={tempStatus}
              />

              <MetricKpi
                title="Влажность"
                value={
                  <span>
                    {Number.isFinite(data.humidityPct) ? data.humidityPct : "—"}
                    %
                  </span>
                }
                hint="Относительная влажность воздуха. Слишком низкая/высокая может влиять на условия эксплуатации."
                status={humidityStatus}
              />

              <MetricKpi
                title="Газ"
                value={
                  <span>
                    {Number.isFinite(data.gasPpm) ? data.gasPpm : "—"} ppm
                  </span>
                }
                hint="Концентрация газа (ppm). Повышенные значения могут быть признаком утечки или задымления."
                status={gasStatus}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Детали</CardTitle>
            <CardDescription>
              Показания и связанные пользователи
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="readings" className="w-full">
              <TabsList>
                <TabsTrigger value="readings">Показания</TabsTrigger>
                <TabsTrigger value="users" className="gap-2">
                  Пользователи
                  <Badge variant="secondary">{usersCount}</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="readings" className="mt-4">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Время</TableHead>
                        <TableHead>Температура</TableHead>
                        <TableHead>Влажность</TableHead>
                        <TableHead>Газ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          {lastRecorded}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{data.temperatureC}°C</span>
                            <MetricBadge variant={tempStatus} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{data.humidityPct}%</span>
                            <MetricBadge variant={humidityStatus} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{data.gasPpm} ppm</span>
                            <MetricBadge variant={gasStatus} />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-3 text-sm text-muted-foreground">
                  Пороги: T &gt; {TEMP_WARNING_C}°C, влажность &lt;{" "}
                  {HUMIDITY_LOW_PCT}% или &gt; {HUMIDITY_HIGH_PCT}%, газ &gt;{" "}
                  {GAS_WARNING_PPM} ppm.
                </div>
              </TabsContent>

              <TabsContent value="users" className="mt-4">
                {usersCount === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Связанные пользователи отсутствуют.
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Имя</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Роль</TableHead>
                          <TableHead className="text-right">ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u, idx) => {
                          const fullName =
                            (u as any)?.fullName ?? (u as any)?.name ?? "—";
                          const email = (u as any)?.email ?? "—";
                          const role = (u as any)?.role ?? "—";
                          const id = (u as any)?.id ?? (u as any)?.userId ?? "";

                          return (
                            <TableRow key={String(id || idx)}>
                              <TableCell className="font-medium truncate">
                                {String(fullName)}
                              </TableCell>
                              <TableCell className="text-muted-foreground truncate">
                                {String(email)}
                              </TableCell>
                              <TableCell>{String(role)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <span className="font-mono text-xs text-muted-foreground truncate max-w-[160px]">
                                    {id ? String(id) : "—"}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={!id}
                                    onClick={() =>
                                      void copyToClipboard(String(id))
                                    }
                                    aria-label="Скопировать ID пользователя"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

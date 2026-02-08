import * as React from "react";
import { fetchFireSensorById } from "@/common/api/requests/fire-sensors/fetch-fire-sensor-by-id";
import { paths } from "@/common/constants/paths";
import { FireSensor } from "@/common/entities/fire-sensor";
import { SensorReading } from "@/common/entities/sensor-reading";
import { User } from "@/common/entities/user";
import { usePageHeader } from "@/common/hooks/use-page-header";
import { cn } from "@/common/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Skeleton } from "@/common/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import {
  Copy,
  Droplets,
  Flame,
  Pencil,
  Power,
  Thermometer,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

const TEMP_WARNING_C = 55;
const HUMIDITY_LOW_PCT = 20;
const HUMIDITY_HIGH_PCT = 80;
const GAS_WARNING_PPM = 300;

type MetricStatus = "ok" | "warning";
type UserLike = User &
  Partial<Record<"fullName" | "name" | "role" | "userId", string>>;

const SENSOR_DETAILS_FALLBACK = {
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
} as const;

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

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

type HeroSectionProps = {
  data: SensorReadingsColumns;
  statusText: string;
  lastRecorded: string;
  locationLine: string;
  onEdit?: (fireSensorId: string) => void;
  onToggleActive?: (fireSensorId: string, nextIsActive: boolean) => void;
  onOpenLocation?: (locationId: string) => void;
};

type KpiStripProps = {
  data: SensorReadingsColumns;
  tempStatus: MetricStatus;
  humidityStatus: MetricStatus;
  gasStatus: MetricStatus;
};

type MetaCardsProps = {
  data: SensorReadingsColumns;
  floorText: string;
  flatText: string;
  installedText: string;
  onOpenLocation?: (locationId: string) => void;
};

type DetailsTabsProps = {
  readingHistory: ReadingHistoryRow[];
  users: User[];
  usersCount: number;
  className?: string;
};

type ReadingPoint = {
  id: string;
  recordedAt: string;
  temperatureC: number;
  humidityPct: number;
  gasPpm: number;
};

type ReadingHistoryRow = ReadingPoint & {
  deltaTemperatureC: number | null;
  deltaHumidityPct: number | null;
  deltaGasPpm: number | null;
};

function mapFireSensorToDetails(
  fireSensor: FireSensor | null | undefined,
): SensorReadingsColumns | null {
  if (!fireSensor) {
    return null;
  }

  const latestReading = fireSensor.sensorReadings?.[0] ?? null;

  return {
    fireSensorId: fireSensor.id,
    locationId: fireSensor.location?.id ?? "",
    country: fireSensor.location?.country ?? SENSOR_DETAILS_FALLBACK.country,
    city: fireSensor.location?.city ?? SENSOR_DETAILS_FALLBACK.city,
    address: fireSensor.location?.address ?? SENSOR_DETAILS_FALLBACK.address,
    serialNumber:
      fireSensor.serialNumber ?? SENSOR_DETAILS_FALLBACK.serialNumber,
    model: fireSensor.model ?? SENSOR_DETAILS_FALLBACK.model,
    isActive: fireSensor.isActive,
    installedAt: fireSensor.installedAt ?? SENSOR_DETAILS_FALLBACK.installedAt,
    floor: fireSensor.location?.floor ?? SENSOR_DETAILS_FALLBACK.floor,
    flat: fireSensor.location?.flat ?? SENSOR_DETAILS_FALLBACK.flat,
    temperatureC:
      latestReading?.temperatureC ?? SENSOR_DETAILS_FALLBACK.temperatureC,
    humidityPct:
      latestReading?.humidityPct ?? SENSOR_DETAILS_FALLBACK.humidityPct,
    gasPpm: latestReading?.gasPpm ?? SENSOR_DETAILS_FALLBACK.gasPpm,
    recordedAt: latestReading?.recordedAt ?? SENSOR_DETAILS_FALLBACK.recordedAt,
    users: fireSensor.location?.users ?? [],
  };
}

function isBlank(v: unknown) {
  if (v === null || v === undefined) return true;
  if (typeof v !== "string") return false;
  return v.trim().length === 0;
}

function getMetricStatus(
  type: "temperature" | "humidity" | "gas",
  value: number,
): MetricStatus {
  if (!Number.isFinite(value)) {
    return "warning";
  }

  if (type === "temperature") {
    return value > TEMP_WARNING_C ? "warning" : "ok";
  }

  if (type === "humidity") {
    return value < HUMIDITY_LOW_PCT || value > HUMIDITY_HIGH_PCT
      ? "warning"
      : "ok";
  }

  return value > GAS_WARNING_PPM ? "warning" : "ok";
}

function formatMetricValue(value: number, unit: string): string {
  return Number.isFinite(value) ? `${value} ${unit}` : "—";
}

function roundMetric(value: number): number {
  return Math.round(value * 10) / 10;
}

function parseRecordedAt(iso: string): number {
  const ts = new Date(iso).getTime();
  return Number.isFinite(ts) ? ts : 0;
}

function buildReadingHistoryRows(points: ReadingPoint[]): ReadingHistoryRow[] {
  const sorted = [...points].sort(
    (a, b) => parseRecordedAt(b.recordedAt) - parseRecordedAt(a.recordedAt),
  );

  return sorted.map((current, index) => {
    const previous = sorted[index + 1];
    return {
      ...current,
      deltaTemperatureC: previous
        ? roundMetric(current.temperatureC - previous.temperatureC)
        : null,
      deltaHumidityPct: previous
        ? roundMetric(current.humidityPct - previous.humidityPct)
        : null,
      deltaGasPpm: previous
        ? roundMetric(current.gasPpm - previous.gasPpm)
        : null,
    };
  });
}

function formatDelta(value: number | null, unit: string): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  const sign = value > 0 ? "+" : "";
  return `${sign}${value} ${unit}`;
}

function readText(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function getUserDisplayName(user: UserLike): string {
  const explicitFullName = readText(user.fullName);
  if (explicitFullName) {
    return explicitFullName;
  }

  const explicitName = readText(user.name);
  if (explicitName) {
    return explicitName;
  }

  const firstName = readText(user.firstName);
  const lastName = readText(user.lastName);
  const fromParts = [firstName, lastName].filter(Boolean).join(" ");

  return fromParts || "—";
}

function getUserRole(user: UserLike): string {
  const directRole = readText(user.role);
  if (directRole) {
    return directRole;
  }

  const firstRoleName = readText(user.roles?.[0]?.name);
  return firstRoleName || "—";
}

function getUserEmail(user: UserLike): string {
  return readText(user.email) || "—";
}

function getUserId(user: UserLike): string {
  const preferredId = readText(user.id);
  if (preferredId) {
    return preferredId;
  }

  return readText(user.userId);
}

function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsVisible(true), delay);
    return () => window.clearTimeout(timeoutId);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function MetricBadge({ status }: { status: MetricStatus }) {
  return (
    <Badge
      variant={status === "warning" ? "destructive" : "secondary"}
      className="ml-auto text-[10px] uppercase tracking-wide"
    >
      {status === "warning" ? "Warning" : "OK"}
    </Badge>
  );
}

function KpiCard(props: {
  title: string;
  value: string;
  hint: string;
  status: MetricStatus;
  icon: React.ReactNode;
}) {
  return (
    <Card className="h-full rounded-xl border-border/70 bg-card/80">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{props.icon}</span>
          <span className="font-medium text-foreground">{props.title}</span>
          <MetricBadge status={props.status} />
        </div>

        <div className="text-2xl font-semibold tracking-tight">
          {props.value}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {props.hint}
        </p>
      </CardContent>
    </Card>
  );
}

function InfoRow(props: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{props.label}</span>
      <span
        className={cn(
          "max-w-[65%] text-right font-medium text-foreground whitespace-normal break-words",
          props.valueClassName,
        )}
      >
        {props.value}
      </span>
    </div>
  );
}

function CopyIdRow(props: {
  label: string;
  value: string;
  copyLabel: string;
  buttonLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg bg-muted/40 p-3">
      <div className="min-w-0 space-y-1">
        <p className="text-xs text-muted-foreground">{props.label}</p>
        <p className="font-mono text-xs text-foreground break-all">
          {props.value}
        </p>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => void copyToClipboard(props.value)}
            aria-label={props.buttonLabel}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{props.copyLabel}</TooltipContent>
      </Tooltip>
    </div>
  );
}

function FallbackBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <Alert className="rounded-xl border-border/70 bg-muted/40">
      <AlertTitle>Показаны тестовые данные</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <span>Не удалось получить актуальные данные по датчику.</span>
        <Button size="sm" onClick={onRetry}>
          Повторить
        </Button>
      </AlertDescription>
    </Alert>
  );
}

function HeroSection({
  data,
  statusText,
  onEdit,
  onToggleActive,
}: HeroSectionProps) {
  const handleEdit = () => {
    if (!onEdit) return;
    onEdit(data.fireSensorId);
  };

  const handleToggleActive = () => {
    if (!onToggleActive) return;
    onToggleActive(data.fireSensorId, !data.isActive);
  };

  return (
    <Card className="rounded-xl border-border/70 bg-gradient-to-br from-card via-card to-muted/35">
      <CardContent className="p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="min-w-0 space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Мониторинг датчика
              </p>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Датчик {data.serialNumber}
              </h1>
              <p className="text-sm text-muted-foreground">{data.model}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Badge variant={data.isActive ? "secondary" : "destructive"}>
              {statusText}
            </Badge>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button
                onClick={handleEdit}
                className="gap-2"
                size="sm"
                disabled={!onEdit}
              >
                <Pencil className="h-4 w-4" />
                Редактировать
              </Button>

              <Button
                variant={data.isActive ? "outline" : "default"}
                onClick={handleToggleActive}
                className="gap-2"
                size="sm"
                disabled={!onToggleActive}
              >
                <Power className="h-4 w-4" />
                {data.isActive ? "Деактивировать" : "Активировать"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KpiStrip({
  data,
  tempStatus,
  humidityStatus,
  gasStatus,
}: KpiStripProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KpiCard
        title="Температура"
        value={formatMetricValue(data.temperatureC, "°C")}
        status={tempStatus}
        hint={`Порог предупреждения: > ${TEMP_WARNING_C}°C`}
        icon={<Thermometer className="h-4 w-4" />}
      />

      <KpiCard
        title="Влажность"
        value={formatMetricValue(data.humidityPct, "%")}
        status={humidityStatus}
        hint={`Порог предупреждения: < ${HUMIDITY_LOW_PCT}% или > ${HUMIDITY_HIGH_PCT}%`}
        icon={<Droplets className="h-4 w-4" />}
      />

      <KpiCard
        title="Газ"
        value={formatMetricValue(data.gasPpm, "ppm")}
        status={gasStatus}
        hint={`Порог предупреждения: > ${GAS_WARNING_PPM} ppm`}
        icon={<Flame className="h-4 w-4" />}
      />
    </div>
  );
}

function MetaCards({
  data,
  floorText,
  flatText,
  installedText,
  onOpenLocation,
}: MetaCardsProps) {
  const handleOpenLocation = () => {
    if (!onOpenLocation) return;
    onOpenLocation(data.locationId);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-xl border-border/70">
          <CardHeader>
            <CardTitle>Локация</CardTitle>
            <CardDescription>Адрес установки и параметры места</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow label="Страна" value={data.country || "—"} />
            <InfoRow label="Город" value={data.city || "—"} />
            <InfoRow label="Адрес" value={data.address || "—"} />
            <InfoRow label="Этаж" value={floorText} />
            <InfoRow label="Квартира" value={flatText} />
            <Button
              type="button"
              variant="outline"
              onClick={handleOpenLocation}
              disabled={!onOpenLocation}
            >
              Открыть локацию
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/70">
          <CardHeader>
            <CardTitle>Информация о датчике</CardTitle>
            <CardDescription>
              Идентификаторы и параметры устройства
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow label="Серийный номер" value={data.serialNumber || "—"} />
            <InfoRow label="Модель" value={data.model || "—"} />
            <InfoRow label="Установлен" value={installedText} />
            <CopyIdRow
              label="fireSensorId"
              value={data.fireSensorId}
              copyLabel="Скопировать fireSensorId"
              buttonLabel="Скопировать fireSensorId"
            />
            <CopyIdRow
              label="locationId"
              value={data.locationId}
              copyLabel="Скопировать locationId"
              buttonLabel="Скопировать locationId"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailsTabs({
  readingHistory,
  users,
  usersCount,
  className,
}: DetailsTabsProps) {
  return (
    <Card className={cn("rounded-xl border-border/70", className)}>
      <CardHeader>
        <CardTitle>Детали</CardTitle>
        <CardDescription>
          История изменений показаний и связанные пользователи
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <Tabs defaultValue="readings">
          <TabsList>
            <TabsTrigger value="readings">Показания</TabsTrigger>
            <TabsTrigger value="users">Пользователи {usersCount}</TabsTrigger>
          </TabsList>

          <TabsContent value="readings">
            {readingHistory.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                История отсутствует.
              </div>
            ) : (
              <div className="rounded-lg border border-border/70">
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[19%]">Время</TableHead>
                      <TableHead className="w-[18%]">Температура</TableHead>
                      <TableHead className="w-[12%]">ΔT</TableHead>
                      <TableHead className="w-[18%]">Влажность</TableHead>
                      <TableHead className="w-[12%]">ΔH</TableHead>
                      <TableHead className="w-[12%]">Газ</TableHead>
                      <TableHead className="w-[9%]">ΔG</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {readingHistory.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="text-muted-foreground whitespace-normal">
                          {formatDateTime(row.recordedAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {formatMetricValue(row.temperatureC, "°C")}
                            </span>
                            <MetricBadge
                              status={getMetricStatus(
                                "temperature",
                                row.temperatureC,
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {formatDelta(row.deltaTemperatureC, "°C")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {formatMetricValue(row.humidityPct, "%")}
                            </span>
                            <MetricBadge
                              status={getMetricStatus(
                                "humidity",
                                row.humidityPct,
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {formatDelta(row.deltaHumidityPct, "%")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{formatMetricValue(row.gasPpm, "ppm")}</span>
                            <MetricBadge
                              status={getMetricStatus("gas", row.gasPpm)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {formatDelta(row.deltaGasPpm, "ppm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="users">
            {usersCount === 0 ? (
              <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Связанные пользователи отсутствуют.
              </div>
            ) : (
              <div className="rounded-lg border border-border/70">
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[32%]">Имя</TableHead>
                      <TableHead className="w-[30%]">Email</TableHead>
                      <TableHead className="w-[18%]">Роль</TableHead>
                      <TableHead className="w-[20%] text-right">ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, idx) => {
                      const userData = user as UserLike;
                      const userId = getUserId(userData);

                      return (
                        <TableRow key={String(userId || idx)}>
                          <TableCell className="font-medium whitespace-normal break-words">
                            {getUserDisplayName(userData)}
                          </TableCell>
                          <TableCell className="text-muted-foreground whitespace-normal break-words">
                            {getUserEmail(userData)}
                          </TableCell>
                          <TableCell className="whitespace-normal break-words">
                            {getUserRole(userData)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="max-w-[170px] truncate font-mono text-xs text-muted-foreground">
                                {userId || "—"}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                disabled={!userId}
                                onClick={() => void copyToClipboard(userId)}
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
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="rounded-xl border-border/70">
        <CardContent className="p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="space-y-3">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="flex flex-wrap gap-2 lg:w-[360px] lg:justify-end">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>

        <Skeleton className="h-[500px] rounded-xl" />
      </div>
    </div>
  );
}

export function FireSensorDetailView({
  data: externalData,
  isLoading: externalIsLoading = false,
  error: externalError,
  onRetry,
  onEdit,
  onToggleActive,
  onOpenLocation,
}: SensorDetailsPageProps) {
  const { setItems } = usePageHeader();
  const { sensorId } = useParams<{ sensorId: string }>();
  const location = useLocation();

  const {
    data: sensorData,
    isLoading: queryIsLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["detail-fire-sensor", sensorId],
    queryFn: () => fetchFireSensorById(sensorId ?? ""),
    retry: false,
    enabled: Boolean(sensorId) && !externalData,
  });

  const mappedData = React.useMemo(
    () => mapFireSensorToDetails(sensorData),
    [sensorData],
  );

  const fallbackData = React.useMemo<SensorReadingsColumns>(
    () => ({
      fireSensorId: sensorId ?? "FS-ALM-024913",
      locationId: "ALM-ABAYA-58",
      ...SENSOR_DETAILS_FALLBACK,
      users: [],
    }),
    [sensorId],
  );

  const data = externalData ?? mappedData ?? fallbackData;
  const isLoading = externalData ? externalIsLoading : queryIsLoading;
  const hasError = Boolean(externalData ? externalError : queryError);
  const isFallbackDataShown = !externalData && !mappedData;

  const handleRetry = onRetry ?? (() => void refetch());
  const readingHistory = React.useMemo<ReadingHistoryRow[]>(() => {
    const sourceReadings = sensorData?.sensorReadings ?? [];

    if (sourceReadings.length > 0) {
      return buildReadingHistoryRows(
        sourceReadings.map((reading: SensorReading) => ({
          id: reading.id,
          recordedAt: reading.recordedAt,
          temperatureC: reading.temperatureC,
          humidityPct: reading.humidityPct,
          gasPpm: reading.gasPpm,
        })),
      );
    }

    return buildReadingHistoryRows([
      {
        id: `${data.fireSensorId}-${data.recordedAt || "latest"}`,
        recordedAt: data.recordedAt,
        temperatureC: data.temperatureC,
        humidityPct: data.humidityPct,
        gasPpm: data.gasPpm,
      },
    ]);
  }, [
    data.fireSensorId,
    data.gasPpm,
    data.humidityPct,
    data.recordedAt,
    data.temperatureC,
    sensorData?.sensorReadings,
  ]);

  React.useEffect(() => {
    if (!data.serialNumber) {
      return;
    }

    setItems([
      {
        title: "Датчики",
        href: paths.getSensorsPath(),
      },
      {
        title: data.serialNumber,
        href: location.pathname,
      },
    ]);
  }, [data.serialNumber, location.pathname, setItems]);

  if (isLoading) return <LoadingSkeleton />;

  const hasKeyData = Boolean(data.fireSensorId && data.serialNumber);
  if (!hasKeyData) {
    return (
      <div className="p-4 md:p-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Нет данных по датчику</CardTitle>
            <CardDescription>
              Проверьте доступность датчика или повторите запрос.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRetry}>Повторить</Button>
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

  const tempStatus = getMetricStatus("temperature", data.temperatureC);
  const humidityStatus = getMetricStatus("humidity", data.humidityPct);
  const gasStatus = getMetricStatus("gas", data.gasPpm);

  const users = Array.isArray(data.users) ? data.users : [];
  const usersCount = users.length;

  const locationLine = [data.country, data.city, data.address]
    .filter((part) => !isBlank(part))
    .join(", ");

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        {hasError && isFallbackDataShown && (
          <FallbackBanner onRetry={handleRetry} />
        )}

        <SectionReveal delay={0}>
          <HeroSection
            data={data}
            statusText={statusText}
            lastRecorded={lastRecorded}
            locationLine={locationLine || "—"}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
            onOpenLocation={onOpenLocation}
          />
        </SectionReveal>

        <SectionReveal delay={60}>
          <KpiStrip
            data={data}
            tempStatus={tempStatus}
            humidityStatus={humidityStatus}
            gasStatus={gasStatus}
          />
        </SectionReveal>

        <SectionReveal delay={120}>
          <div className="space-y-6">
            <MetaCards
              data={data}
              floorText={floorText}
              flatText={flatText}
              installedText={installedText}
              onOpenLocation={onOpenLocation}
            />

            <DetailsTabs
              readingHistory={readingHistory}
              users={users}
              usersCount={usersCount}
            />
          </div>
        </SectionReveal>
      </div>
    </TooltipProvider>
  );
}

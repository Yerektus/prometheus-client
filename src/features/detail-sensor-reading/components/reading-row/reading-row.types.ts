export interface ReadingRowProps {
  label: string;
  value: string;
  level: ReadingLevel;
}

export type ReadingLevel = "ok" | "warning";

export const THRESHOLDS = {
  temperatureCWarningAbove: 55,
  humidityPctWarningBelow: 20,
  humidityPctWarningAbove: 80,
  gasPpmWarningAbove: 300,
} as const;

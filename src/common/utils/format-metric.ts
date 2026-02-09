export function formatMetric(value: number, unit: string): string {
  return value ? `${value} ${unit}` : "—";
}

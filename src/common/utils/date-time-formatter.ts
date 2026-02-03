import dayjs from "dayjs";

export enum DateTimeFormat {
  Date = "DD/MM/YYYY",
  DateTime = "DD/MM/YYYY HH:mm",
  Time = "HH:mm",
}

export const dateTimeFormatter = (
  dateTime: string,
  format: DateTimeFormat = DateTimeFormat.DateTime,
): string | null => {
  if (!dateTime) {
    return null;
  }
  return dayjs(dateTime).format(format);
};

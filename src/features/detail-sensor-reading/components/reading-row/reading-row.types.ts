import { ReadingLevel } from "@/common/constants/readings";

export interface ReadingRowProps {
  label: string;
  value: string;
  level: ReadingLevel;
}

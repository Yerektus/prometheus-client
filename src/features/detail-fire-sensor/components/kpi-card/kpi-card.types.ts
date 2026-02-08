import { ReadingLevel } from "@/common/constants/readings";
import React from "react";

export interface kpiCardProps {
  title: string;
  value: string;
  hint: string;
  status: ReadingLevel;
  icon: React.ReactNode;
}

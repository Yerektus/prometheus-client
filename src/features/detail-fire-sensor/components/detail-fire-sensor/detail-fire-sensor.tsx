import * as React from "react";
import { cn } from "@/common/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Button } from "@/common/components/ui/button";
import { TooltipProvider } from "@/common/components/ui/tooltip";
import { DetailFireSensorProps } from "./detail-fire-sensor.types";
import { DetailFireSensorInfo } from "../detail-fire-sesnor-info/detail-fire-sensor-info";
import { HeroSection } from "../hero-section/hero-section";
import { KpiStrip } from "../kpi-sript/kpi-strip";
import { DetailFireSensorTabs } from "../detail-fire-sensor-tabs/detail-fire-sensors-tabs";
import { ReadingsChart } from "../reading-charts/readings-chart";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

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

export function DetailFireSensor({
  data,
  hasError,
  onRetry,
}: DetailFireSensorProps) {
  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        {hasError && <FallbackBanner onRetry={onRetry} />}
        <SectionReveal delay={40}>
          <HeroSection data={data} />
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <SectionReveal className="lg:sticky lg:top-16" delay={0}>
            <DetailFireSensorInfo data={data} />
          </SectionReveal>

          <div className="space-y-6">
            <SectionReveal delay={80}>
              <KpiStrip data={data} />
            </SectionReveal>

            <SectionReveal delay={100}>
              <ReadingsChart sensorReadings={data.sensorReadings} />
            </SectionReveal>

            <SectionReveal delay={120}>
              <DetailFireSensorTabs data={data} />
            </SectionReveal>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

import { Badge } from "@/common/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/common/components/ui/card";
import {
  BrickWallFire,
  Pencil,
  Power,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { HeroSectionProps } from "./hero-section.types";
import { Button } from "@/common/components/ui/button";

export const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <Card className="relative overflow-hidden rounded-2xl border-border/70 bg-card">
      <CardHeader></CardHeader>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_110%_at_0%_0%,rgba(251,146,60,0.16),transparent_55%),radial-gradient(120%_100%_at_100%_100%,rgba(14,165,233,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-orange-300/20 blur-3xl"
      />

      <CardContent className="relative p-5">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-orange-200 bg-orange-50/90 text-orange-800"
              >
                <BrickWallFire className="h-3.5 w-3.5" />
                Fire Monitoring
              </Badge>
              <Badge
                variant="outline"
                className={
                  data.isActive
                    ? "border-emerald-300 bg-emerald-50/90 text-emerald-700"
                    : "border-rose-300 bg-rose-50/90 text-rose-700"
                }
              >
                {data.isActive ? (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Работает
                  </>
                ) : (
                  <>
                    <ShieldOff className="h-3.5 w-3.5" />
                    Не работает
                  </>
                )}
              </Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
                {data.model || "Модель не указана"} {data.serialNumber || "—"}
              </h1>
            </div>
          </div>

          <div className="w-full max-w-[320px] rounded-2xl border border-border/70 bg-background/85 p-4 text-center backdrop-blur-sm md:p-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Быстрые действия
              </p>
              <p className="text-sm text-foreground">
                Управление состоянием и настройками датчика
              </p>
            </div>

            <div className="mt-4 grid gap-2">
              <Button className="h-9 justify-center gap-2 px-3" size="default">
                <Pencil className="h-4 w-4" />
                Редактировать
              </Button>

              <Button
                variant={data.isActive ? "outline" : "default"}
                className="h-9 justify-center gap-2 px-3"
                size="default"
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
};

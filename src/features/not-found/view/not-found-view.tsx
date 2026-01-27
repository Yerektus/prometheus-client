import { Button } from "@/common/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/common/components/ui/empty";
import { paths } from "@/common/constants/paths";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center align-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Info />
          </EmptyMedia>
          <EmptyTitle>Ой! Кажется, этой страницы здесь нет</EmptyTitle>
          <EmptyDescription>
            Если вы не нашли нужную страницу, рекомендуем вернуться на главную
            страницу.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="default"
            onClick={() =>
              navigate(paths.getHomePath(), {
                replace: true,
              })
            }
          >
            Вернуться на главную страницу
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

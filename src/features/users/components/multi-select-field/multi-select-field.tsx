import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";

export interface MultiSelectOption {
  id: string;
  label: string;
}

interface MultiSelectFieldProps {
  id?: string;
  value: string[];
  options: MultiSelectOption[];
  placeholder: string;
  emptyMessage?: string;
  disabled?: boolean;
  onChange: (nextValue: string[]) => void;
}

export const MultiSelectField = ({
  id,
  value,
  options,
  placeholder,
  emptyMessage = "Нет данных",
  disabled = false,
  onChange,
}: MultiSelectFieldProps) => {
  const toggle = (itemId: string) => {
    if (value.includes(itemId)) {
      onChange(value.filter((id) => id !== itemId));
      return;
    }

    onChange([...value, itemId]);
  };

  const selectedOptions = options.filter((option) => value.includes(option.id));
  const selectedText =
    selectedOptions.length === 0
      ? placeholder
      : selectedOptions.length <= 2
        ? selectedOptions.map((option) => option.label).join(", ")
        : `${selectedOptions
            .slice(0, 2)
            .map((option) => option.label)
            .join(", ")} +${selectedOptions.length - 2}`;

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          <span
            className={cn(
              "truncate text-left",
              selectedOptions.length === 0 && "text-muted-foreground",
            )}
          >
            {selectedText}
          </span>
          <span className="text-xs text-muted-foreground">{value.length}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-h-64 overflow-auto p-1">
        {options.length === 0 ? (
          <div className="p-2 text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {options.map((option) => {
              const checked = value.includes(option.id);
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => toggle(option.id)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-muted"
                >
                  <Checkbox checked={checked} />
                  <span className="text-sm">{option.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

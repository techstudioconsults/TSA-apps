import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { cn } from "../utils";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProperties {
  value: string;
  onValueChange: (value: string) => void;
  options?: FilterOption[];
  placeholder?: string;
  width?: string;
  disabled?: boolean;
}

const FilterDropdown = ({
  value,
  onValueChange,
  options,
  placeholder = "Filter",
  width = "w-[123px]",
  disabled = false,
}: FilterDropdownProperties) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn(width, "shadow-none")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { FilterDropdown };

"use client";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";

type Props = {
  year: number;
  yearsRange: number[];
};
const CashflowFilters = ({ year, yearsRange }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Select
        defaultValue={year.toString()}
        onValueChange={(value) => {
          router.push(`/dashboard?cfyear=${value}`);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearsRange.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CashflowFilters;

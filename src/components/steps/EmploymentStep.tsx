import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmploymentData {
  employmentStatus: string;
  monthlyIncome: string;
  employer: string;
}

interface EmploymentStepProps {
  data: EmploymentData;
  onChange: (data: EmploymentData) => void;
}

const employmentStatuses = [
  "Employed",
  "Self-employed",
  "Contract Worker",
  "Retired",
  "Student",
  "Unemployed",
];

export function EmploymentStep({ data, onChange }: EmploymentStepProps) {
  const handleChange = (field: keyof EmploymentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div className="space-y-1">
          <Label htmlFor="employmentStatus">Employment status</Label>
          <Select
            value={data.employmentStatus}
            onValueChange={(value) => handleChange("employmentStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {employmentStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly income (before tax)</Label>
          <Input
            id="monthlyIncome"
            type="number"
            placeholder="e.g., 4500"
            value={data.monthlyIncome}
            onChange={(e) => handleChange("monthlyIncome", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="employer">Employer / Business name</Label>
          <Input
            id="employer"
            placeholder=""
            value={data.employer}
            onChange={(e) => handleChange("employer", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

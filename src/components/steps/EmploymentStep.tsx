import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmploymentData {
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  annualIncome: string;
  yearsEmployed: string;
}

interface EmploymentStepProps {
  data: EmploymentData;
  onChange: (data: EmploymentData) => void;
}

const employmentStatuses = [
  "Full-time Employee",
  "Part-time Employee",
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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold font-display text-foreground">Employment Details</h2>
        <p className="text-muted-foreground mt-1">Help us understand your income and employment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="employmentStatus">Employment Status</Label>
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
          <Label htmlFor="employer">Employer Name</Label>
          <Input
            id="employer"
            placeholder="Company Inc."
            value={data.employer}
            onChange={(e) => handleChange("employer", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="Software Developer"
            value={data.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualIncome">Annual Income (CAD)</Label>
          <Input
            id="annualIncome"
            type="number"
            placeholder="75,000"
            value={data.annualIncome}
            onChange={(e) => handleChange("annualIncome", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="yearsEmployed">Years at Current Employer</Label>
          <Input
            id="yearsEmployed"
            type="number"
            placeholder="3"
            value={data.yearsEmployed}
            onChange={(e) => handleChange("yearsEmployed", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

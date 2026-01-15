import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LoanData {
  loanAmount: string;
  loanPurpose: string;
  details: string;
}

interface LoanStepProps {
  data: LoanData;
  onChange: (data: LoanData) => void;
}

const loanPurposes = [
  { value: "debt-consolidation", label: "Debt consolidation" },
  { value: "home-improvement", label: "Home improvement" },
  { value: "vehicle", label: "Vehicle" },
  { value: "education", label: "Education" },
  { value: "moving", label: "Moving expenses" },
  { value: "other", label: "Other" },
];

export function LoanStep({ data, onChange }: LoanStepProps) {
  const handleChange = (field: keyof LoanData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div className="space-y-1">
          <Label htmlFor="loanAmount">Requested amount (CAD)</Label>
          <Input
            id="loanAmount"
            type="number"
            placeholder="e.g., 5000"
            value={data.loanAmount}
            onChange={(e) => handleChange("loanAmount", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanPurpose">Purpose of loan</Label>
          <Select
            value={data.loanPurpose}
            onValueChange={(value) => handleChange("loanPurpose", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {loanPurposes.map((purpose) => (
                <SelectItem key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="details">Additional details (optional)</Label>
          <Textarea
            id="details"
            placeholder="Anything we should know about your application?"
            rows={4}
            value={data.details}
            onChange={(e) => handleChange("details", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

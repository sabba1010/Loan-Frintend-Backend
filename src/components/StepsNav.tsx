import { Check } from "lucide-react";

interface StepsNavProps {
  currentStep: number;
}

const steps = ["Personal", "Employment", "Loan", "Uploads"];

export function StepsNav({ currentStep }: StepsNavProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = currentStep === stepNum;
        const isDone = currentStep > stepNum;
        
        return (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div 
                  className={`flex-1 h-0.5 transition-colors duration-300 ${
                    currentStep > i ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              {i < steps.length - 1 && (
                <div 
                  className={`flex-1 h-0.5 transition-colors duration-300 ${
                    currentStep > stepNum ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
            <span 
              className={`text-xs mt-2 font-medium transition-colors ${
                isActive || isDone ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

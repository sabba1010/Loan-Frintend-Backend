import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { StepsNav } from "./StepsNav";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { EmploymentStep } from "./steps/EmploymentStep";
import { LoanStep } from "./steps/LoanStep";
import { UploadsStep } from "./steps/UploadsStep";
import { SuccessStep } from "./steps/SuccessStep";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    province: "",
  });

  const [employmentInfo, setEmploymentInfo] = useState({
    employmentStatus: "",
    employer: "",
    jobTitle: "",
    annualIncome: "",
    yearsEmployed: "",
  });

  const [loanInfo, setLoanInfo] = useState({
    loanAmount: "",
    loanPurpose: "",
    details: "",
  });

  const [t1File, setT1File] = useState<File | null>(null);
  const [voidChequeFile, setVoidChequeFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const progress = useMemo(() => {
    const essentials = [
      personalInfo.firstName,
      personalInfo.lastName,
      personalInfo.email,
      personalInfo.phone,
      personalInfo.dateOfBirth,
      personalInfo.province,
      employmentInfo.employmentStatus,
      employmentInfo.annualIncome,
      loanInfo.loanAmount,
      loanInfo.loanPurpose,
      t1File,
      voidChequeFile,
      consent ? "1" : "",
    ];
    const done = essentials.filter(Boolean).length;
    return Math.round((done / essentials.length) * 100);
  }, [personalInfo, employmentInfo, loanInfo, t1File, voidChequeFile, consent]);

  const validateStep = (step: number): string | null => {
    switch (step) {
      case 1:
        if (!personalInfo.firstName || !personalInfo.lastName) return "Enter your legal name.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) return "Enter a valid email.";
        if (!/^[0-9\-\+\(\)\s]{7,}$/.test(personalInfo.phone)) return "Enter a valid phone number.";
        if (!personalInfo.dateOfBirth) return "Enter your date of birth.";
        if (!personalInfo.province) return "Select your province.";
        return null;
      case 2:
        if (!employmentInfo.employmentStatus) return "Select employment status.";
        if (!employmentInfo.annualIncome || Number(employmentInfo.annualIncome) <= 0) {
          return "Enter your annual income.";
        }
        return null;
      case 3:
        if (!loanInfo.loanAmount || Number(loanInfo.loanAmount) < 500) {
          return "Minimum loan amount is $500.";
        }
        if (!loanInfo.loanPurpose) return "Tell us what the loan is for.";
        return null;
      case 4:
        if (!t1File) return "Upload your T1 General (PDF).";
        if (!voidChequeFile) return "Upload your Void Cheque (PDF/PNG/JPG).";
        if (!consent) return "You must consent to the credit check to proceed.";
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    setError(null);
    setCurrentStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 900));
      
      const id = `APP-${Date.now()}`;
      setApplicationId(id);
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessStep applicationId={applicationId} />;
  }

  return (
    <div className="space-y-6">
      <ProgressBar progress={progress} />
      <StepsNav currentStep={currentStep} />

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      <div className="form-card">
        {currentStep === 1 && (
          <PersonalInfoStep data={personalInfo} onChange={setPersonalInfo} />
        )}
        {currentStep === 2 && (
          <EmploymentStep data={employmentInfo} onChange={setEmploymentInfo} />
        )}
        {currentStep === 3 && (
          <LoanStep data={loanInfo} onChange={setLoanInfo} />
        )}
        {currentStep === 4 && (
          <UploadsStep
            t1File={t1File}
            onT1FileSelect={setT1File}
            voidChequeFile={voidChequeFile}
            onVoidChequeSelect={setVoidChequeFile}
            consent={consent}
            onConsentChange={setConsent}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {currentStep < 4 ? (
          <Button onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button 
            variant="hero" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting…" : "Submit application"}
          </Button>
        )}
      </div>
    </div>
  );
}

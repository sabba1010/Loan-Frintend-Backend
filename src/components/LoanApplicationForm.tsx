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
        // Personal Info validation - ALL REQUIRED FIELDS
        if (!personalInfo.firstName || personalInfo.firstName.trim() === "") {
          return "First name is required.";
        }
        if (!personalInfo.lastName || personalInfo.lastName.trim() === "") {
          return "Last name is required.";
        }
        if (!personalInfo.email || personalInfo.email.trim() === "") {
          return "Email is required.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
          return "Please enter a valid email address.";
        }
        if (!personalInfo.phone || personalInfo.phone.trim() === "") {
          return "Phone number is required.";
        }
        if (!/\d/.test(personalInfo.phone.replace(/\D/g, "")) || personalInfo.phone.replace(/\D/g, "").length < 7) {
          return "Please enter a valid phone number (at least 7 digits).";
        }
        if (!personalInfo.dateOfBirth || personalInfo.dateOfBirth.trim() === "") {
          return "Date of birth is required.";
        }
        if (personalInfo.sin && personalInfo.sin.trim() !== "") {
          if (!/^\d{9}$/.test(personalInfo.sin)) {
            return "SIN must be exactly 9 digits.";
          }
        }
        if (!personalInfo.streetAddress || personalInfo.streetAddress.trim() === "") {
          return "Street address is required.";
        }
        if (!personalInfo.city || personalInfo.city.trim() === "") {
          return "City is required.";
        }
        if (!personalInfo.province || personalInfo.province.trim() === "") {
          return "Province is required.";
        }
        if (!personalInfo.postalCode || personalInfo.postalCode.trim() === "") {
          return "Postal code is required.";
        }
        return null;
      case 2:
        // Employment Info validation - ALL REQUIRED FIELDS
        if (!employmentInfo.employmentStatus || employmentInfo.employmentStatus.trim() === "") {
          return "Employment status is required.";
        }
        if (!employmentInfo.monthlyIncome || employmentInfo.monthlyIncome.trim() === "") {
          return "Monthly income is required.";
        }
        if (Number(employmentInfo.monthlyIncome) <= 0) {
          return "Monthly income must be greater than 0.";
        }
        if (!employmentInfo.employer || employmentInfo.employer.trim() === "") {
          return "Employer / Business name is required.";
        }
        return null;
      case 3:
        // Loan Info validation - ALL REQUIRED FIELDS
        if (!loanInfo.loanAmount || loanInfo.loanAmount.trim() === "") {
          return "Loan amount is required.";
        }
        if (Number(loanInfo.loanAmount) < 500) {
          return "Minimum loan amount is $500.";
        }
        if (!loanInfo.loanPurpose || loanInfo.loanPurpose.trim() === "") {
          return "Purpose of loan is required.";
        }
        return null;
      case 4:
        // All files and consent are optional
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
    console.log("=".repeat(70));
    console.log("🚀 FORM SUBMISSION STARTED");
    console.log("=".repeat(70));
    
    const validationError = validateStep(currentStep);
    if (validationError) {
      console.warn("⚠️  Validation error:", validationError);
      setError(validationError);
      toast.error(validationError);
      return;
    }

    console.log("✅ Validation passed for step", currentStep);
    setIsSubmitting(true);
    setError(null);

    try {
      console.log("\n📋 CURRENT FORM STATE:");
      console.log("Personal Info:", personalInfo);
      console.log("Employment Info:", employmentInfo);
      console.log("Loan Info:", loanInfo);
      console.log("T1 File:", t1File ? `${t1File.name} (${t1File.size} bytes)` : "null");
      console.log("Void Cheque File:", voidChequeFile ? `${voidChequeFile.name} (${voidChequeFile.size} bytes)` : "null");

      // Convert files to base64 for JSON transmission
      const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          console.log(`📖 Reading file: ${file.name}`);
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const result = reader.result as string;
              if (!result.includes(',')) {
                throw new Error("Invalid file format");
              }
              const base64 = result.split(',')[1];
              console.log(`✅ Successfully converted ${file.name} to base64 (${base64.length} chars)`);
              resolve(base64);
            } catch (err) {
              console.error(`❌ Error processing ${file.name}:`, err);
              reject(err);
            }
          };
          reader.onerror = (err) => {
            console.error(`❌ FileReader error for ${file.name}:`, err);
            reject(err);
          };
          reader.readAsDataURL(file);
        });
      };

      // Prepare file data
      let t1FileData = null;
      let voidChequeFileData = null;

      if (t1File) {
        console.log("\n🔄 Processing T1 file...");
        t1FileData = {
          name: t1File.name,
          type: t1File.type,
          size: t1File.size,
          data: await readFileAsBase64(t1File),
        };
        console.log("✅ T1 file processed");
      }

      if (voidChequeFile) {
        console.log("\n🔄 Processing void cheque file...");
        voidChequeFileData = {
          name: voidChequeFile.name,
          type: voidChequeFile.type,
          size: voidChequeFile.size,
          data: await readFileAsBase64(voidChequeFile),
        };
        console.log("✅ Void cheque file processed");
      }

      // Build JSON payload - ONLY include fields that have values
      // This creates a 1:1 mapping: whatever user filled in gets sent
      const payload: Record<string, any> = {};

      console.log("\n📝 BUILDING PAYLOAD - Adding only filled fields:");

      // Personal Info - only add if filled
      if (personalInfo.firstName) { payload.firstName = personalInfo.firstName; console.log("  ✓ firstName:", personalInfo.firstName); }
      if (personalInfo.lastName) { payload.lastName = personalInfo.lastName; console.log("  ✓ lastName:", personalInfo.lastName); }
      if (personalInfo.email) { payload.email = personalInfo.email; console.log("  ✓ email:", personalInfo.email); }
      if (personalInfo.phone) { payload.phone = personalInfo.phone; console.log("  ✓ phone:", personalInfo.phone); }
      if (personalInfo.dateOfBirth) { payload.dateOfBirth = personalInfo.dateOfBirth; console.log("  ✓ dateOfBirth:", personalInfo.dateOfBirth); }
      if (personalInfo.province) { payload.province = personalInfo.province; console.log("  ✓ province:", personalInfo.province); }

      // Employment Info - only add if filled
      if (employmentInfo.employmentStatus) { payload.employmentStatus = employmentInfo.employmentStatus; console.log("  ✓ employmentStatus:", employmentInfo.employmentStatus); }
      if (employmentInfo.employer) { payload.employer = employmentInfo.employer; console.log("  ✓ employer:", employmentInfo.employer); }
      if (employmentInfo.jobTitle) { payload.jobTitle = employmentInfo.jobTitle; console.log("  ✓ jobTitle:", employmentInfo.jobTitle); }
      if (employmentInfo.annualIncome) { payload.annualIncome = employmentInfo.annualIncome; console.log("  ✓ annualIncome:", employmentInfo.annualIncome); }
      if (employmentInfo.yearsEmployed) { payload.yearsEmployed = employmentInfo.yearsEmployed; console.log("  ✓ yearsEmployed:", employmentInfo.yearsEmployed); }

      // Loan Info - only add if filled
      if (loanInfo.loanAmount) { payload.loanAmount = loanInfo.loanAmount; console.log("  ✓ loanAmount:", loanInfo.loanAmount); }
      if (loanInfo.loanPurpose) { payload.loanPurpose = loanInfo.loanPurpose; console.log("  ✓ loanPurpose:", loanInfo.loanPurpose); }
      if (loanInfo.details) { payload.details = loanInfo.details; console.log("  ✓ details:", loanInfo.details); }

      // Files - only add if present
      if (t1FileData) { payload.t1File = t1FileData; console.log("  ✓ t1File:", { name: t1FileData.name, size: t1FileData.size }); }
      if (voidChequeFileData) { payload.voidChequeFile = voidChequeFileData; console.log("  ✓ voidChequeFile:", { name: voidChequeFileData.name, size: voidChequeFileData.size }); }

      console.log("\n📤 FINAL PAYLOAD STRUCTURE:");
      console.log(JSON.stringify(payload, null, 2));
      console.log(`\n✅ Payload has ${Object.keys(payload).length} fields`);

      console.log("\n🌐 SENDING REQUEST TO BACKEND:");
      console.log("URL: https://loan-backend-flame.vercel.app/api/contact");
      console.log("Method: POST");
      console.log("Content-Type: application/json");

      // Send as JSON (application/json)
      const response = await fetch("https://loan-backend-flame.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("\n📥 RESPONSE RECEIVED:");
      console.log("Status:", response.status, response.statusText);
      console.log("Headers:", {
        contentType: response.headers.get("content-type"),
      });

      const data = await response.json();

      console.log("Response Data:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.error || `Server error: ${response.status}`;
        console.error("❌ Backend returned error status:", response.status);
        console.error("❌ Error message:", errorMessage);
        console.error("❌ Full error response:", data);
        throw new Error(errorMessage);
      }

      // Success: set application ID and show success UI
      const id = `APP-${Date.now()}`;
      setApplicationId(id);
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      console.log("\n" + "=".repeat(70));
      console.log("✅ APPLICATION SUBMITTED SUCCESSFULLY");
      console.log("Application ID:", id);
      console.log("Backend response:", data);
      console.log("=".repeat(70));
    } catch (e: any) {
      const errorMessage = e?.message || "Something went wrong. Please try again.";
      console.error("\n" + "=".repeat(70));
      console.error("❌ SUBMISSION FAILED");
      console.error("Error message:", errorMessage);
      console.error("Error type:", e?.name);
      console.error("Full error object:", e);
      if (e?.stack) {
        console.error("Stack trace:", e.stack);
      }
      console.error("=".repeat(70));
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessStep applicationId={applicationId} />;
  }

  return (
    <div className="space-y-4">
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

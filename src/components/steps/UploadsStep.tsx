import { FileUpload } from "@/components/FileUpload";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface UploadsStepProps {
  t1File: File | null;
  onT1FileSelect: (file: File | null) => void;
  voidChequeFile: File | null;
  onVoidChequeSelect: (file: File | null) => void;
  consent: boolean;
  onConsentChange: (consent: boolean) => void;
}

export function UploadsStep({
  t1File,
  onT1FileSelect,
  voidChequeFile,
  onVoidChequeSelect,
  consent,
  onConsentChange,
}: UploadsStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <FileUpload
        label="T1 General (PDF)"
        description="Upload your most recent T1 General. Accepted type: PDF. Max 10MB."
        acceptedFormats=".pdf"
        selectedFile={t1File}
        onFileSelect={onT1FileSelect}
      />

      <FileUpload
        label="Void cheque (PDF/PNG/JPG)"
        description="Upload a void cheque or direct‑deposit form from your bank. Max 10MB."
        acceptedFormats=".pdf,.jpg,.jpeg,.png"
        selectedFile={voidChequeFile}
        onFileSelect={onVoidChequeSelect}
      />

      <div className="flex items-start gap-3 pt-4">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => onConsentChange(checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
          I consent to One quick loan Ltd Financial Inc. obtaining my credit report from a Canadian 
          credit bureau (e.g., Equifax or TransUnion) and verifying my income for the purposes 
          of processing this application.
        </Label>
      </div>
    </div>
  );
}

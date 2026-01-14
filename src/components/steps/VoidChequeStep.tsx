import { FileUpload } from "@/components/FileUpload";
import { AlertCircle, CreditCard } from "lucide-react";

interface VoidChequeStepProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

export function VoidChequeStep({ file, onFileSelect }: VoidChequeStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold font-display text-foreground">Void Cheque</h2>
        <p className="text-muted-foreground mt-1">
          Upload a void cheque for direct deposit setup
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-5 border border-border">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Why do we need this?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              A void cheque provides your banking information (institution, transit, and account numbers) 
              so we can deposit funds directly into your account upon approval.
            </p>
          </div>
        </div>
      </div>

      <FileUpload
        label="Upload Void Cheque"
        description="Take a photo or scan of a cheque marked 'VOID'"
        acceptedFormats=".pdf,.jpg,.jpeg,.png"
        selectedFile={file}
        onFileSelect={onFileSelect}
      />

      <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-foreground">No physical cheques?</p>
          <p className="text-muted-foreground mt-0.5">
            You can also upload a direct deposit form from your bank, or a screenshot from your online banking showing your account details.
          </p>
        </div>
      </div>
    </div>
  );
}

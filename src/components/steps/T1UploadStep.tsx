import { FileUpload } from "@/components/FileUpload";
import { AlertCircle, FileText } from "lucide-react";

interface T1UploadStepProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

export function T1UploadStep({ file, onFileSelect }: T1UploadStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold font-display text-foreground">T1 General Tax Form</h2>
        <p className="text-muted-foreground mt-1">
          Upload your most recent T1 General tax return for income verification
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-5 border border-border">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">What is a T1 General?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              The T1 General is the form used by Canadian residents to file their personal income tax return. 
              You can find this document in your CRA My Account or from your tax preparer.
            </p>
          </div>
        </div>
      </div>

      <FileUpload
        label="Upload T1 General"
        description="Please upload a clear copy of your most recent T1 General tax return"
        acceptedFormats=".pdf,.jpg,.jpeg,.png"
        selectedFile={file}
        onFileSelect={onFileSelect}
      />

      <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-xl">
        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-foreground">Privacy Notice</p>
          <p className="text-muted-foreground mt-0.5">
            Your documents are encrypted and securely stored. We only use this information to verify your income for loan approval.
          </p>
        </div>
      </div>
    </div>
  );
}

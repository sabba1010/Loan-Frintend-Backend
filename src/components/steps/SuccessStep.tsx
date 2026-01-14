import { CheckCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStepProps {
  applicationId: string;
}

export function SuccessStep({ applicationId }: SuccessStepProps) {
  return (
    <div className="text-center space-y-8 py-8 animate-slide-up">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold font-display text-foreground">Application Submitted!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for your application. We've received your documents and will review them shortly.
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-6 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground">Your Application ID</p>
        <p className="text-2xl font-bold font-display text-foreground mt-1">{applicationId}</p>
        <p className="text-xs text-muted-foreground mt-2">Save this for your records</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
          <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
            <Mail className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Email Confirmation</p>
              <p className="text-xs text-muted-foreground">You'll receive a confirmation email within 24 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
            <Phone className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Advisor Call</p>
              <p className="text-xs text-muted-foreground">A loan advisor will contact you within 2 business days</p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="outline" onClick={() => window.location.reload()}>
        Start New Application
      </Button>
    </div>
  );
}

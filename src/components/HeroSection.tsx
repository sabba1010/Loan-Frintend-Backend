import { Shield, FileCheck, Lock } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-primary-foreground py-4 lg:py-8">
      <div className="max-w-xl space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight">
          Apply for a personal loan in minutes
        </h1>
        <p className="text-base lg:text-lg opacity-90 leading-relaxed">
          Upload your <span className="font-semibold">T1 General</span> and a{" "}
          <span className="font-semibold">void cheque</span>. We'll review your
          application securely and get back within one business day.
        </p>
        
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-sm font-medium">Canadian residents only</span>
          </div>
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-sm font-medium">No hard check until you consent</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-sm font-medium">Bank‑level encryption (TLS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

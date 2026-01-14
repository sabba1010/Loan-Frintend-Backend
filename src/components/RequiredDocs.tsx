import { FileText, CreditCard } from "lucide-react";

export function RequiredDocs() {
  return (
    <section id="required-docs" className="py-16 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
          Required documents
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-6 shadow-card flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">T1 General</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most recent tax year, PDF export from CRA My Account or your tax software.
              </p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Void cheque</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A PDF/PNG/JPG showing your name, institution, transit & account numbers. Many banks allow downloading a "Direct Deposit / Pre‑authorized Debit" form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

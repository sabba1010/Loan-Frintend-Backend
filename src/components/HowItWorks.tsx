export function HowItWorks() {
  const steps = [
    {
      title: "Apply online",
      description: "Complete the short application and upload your T1 General + void cheque.",
    },
    {
      title: "Fast review",
      description: "Our underwriters assess eligibility using Canadian income criteria.",
    },
    {
      title: "Funding",
      description: "On approval, funds are deposited to your account—often within 24h.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-card rounded-2xl p-6 shadow-card">
              <div className="text-xs font-semibold text-primary mb-2">Step {i + 1}</div>
              <h3 className="text-lg font-semibold font-display text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

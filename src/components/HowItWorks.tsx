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
    <section id="how-it-works" className="py-6 sm:py-12 md:py-16 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-3xl md:text-3xl font-bold font-display text-foreground text-center mb-6 sm:mb-10">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-card rounded-2xl p-4 sm:p-6 shadow-card flex flex-col justify-between">
              <div className="text-xs sm:text-sm font-semibold text-primary mb-2 sm:mb-3">Step {i + 1}</div>
              <h3 className="text-lg sm:text-xl font-semibold font-display text-foreground mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

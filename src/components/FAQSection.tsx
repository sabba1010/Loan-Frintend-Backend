import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const faqs = [
    {
      question: "Who is eligible?",
      answer: "Canadian residents 18+ with valid T1 General and a Canadian bank account. We assess applications based on income and creditworthiness.",
    },
    {
      question: "How long does approval take?",
      answer: "We review most applications within 1 business day. Once approved, funds are typically deposited within 24 hours.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We use bank-level TLS encryption and never share your information with third parties without your consent.",
    },
  ];

  return (
    <section id="faqs" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
          FAQs
        </h2>
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border px-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

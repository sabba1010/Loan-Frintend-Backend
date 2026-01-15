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
      question: "Do you run a hard credit check?",
      answer: "We only run a hard inquiry after you explicitly consent on the Uploads step.",
    },
    {
      question: "Is my data secure?",
      answer: "Files are transmitted over TLS. Replace the submission logic with secure uploads to your storage provider and server‑side encryption at rest.",
    },
    {
      question: "Who is eligible?",
      answer: "Canadian residents who have a steady income and a Canadian chequing account.",
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

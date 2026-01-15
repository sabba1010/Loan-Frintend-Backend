import { Leaf } from "lucide-react";

export function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full py-4 px-6 bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold font-display text-foreground">One quick loan Ltd</span><hr className="visibility-hidden"/>
            <span className="text-xl font-normal font-display text-muted-foreground ml-1">Fast, secure, and Canadian compliant</span> 
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollTo("how-it-works")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollTo("required-docs")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Required documents
          </button>
          <button 
            onClick={() => scrollTo("faqs")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQs
          </button>
        </nav>
      </div>
    </header>
  );
}

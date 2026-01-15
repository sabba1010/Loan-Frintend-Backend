import { Leaf } from "lucide-react";

export function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full py-3 sm:py-4 px-3 sm:px-4 bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Leaf className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <span className="text-base sm:text-lg lg:text-xl font-bold font-display text-foreground block">One quick loan Ltd</span>
            <span className="text-xs sm:text-sm lg:text-base font-normal font-display text-muted-foreground">Fast, secure, Canadian</span> 
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

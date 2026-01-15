import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LoanApplicationForm } from "@/components/LoanApplicationForm";
import { HowItWorks } from "@/components/HowItWorks";
import { RequiredDocs } from "@/components/RequiredDocs";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-hero">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Hero content */}
            <HeroSection />
            
            {/* Application form */}
            <div className="bg-card rounded-2xl shadow-xl p-4 lg:p-6">
              <LoanApplicationForm />
            </div>
          </div>
        </div>
      </div>
      
      <HowItWorks />
      <RequiredDocs />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;

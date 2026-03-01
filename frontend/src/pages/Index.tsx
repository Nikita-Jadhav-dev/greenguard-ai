import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnalysisResult from "@/components/AnalysisResult";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsAnalyzing(true);
      
      // Simulate analysis time
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
  }, []);

  return (
    <div className="min-h-screen earth-gradient">
      <Header />
      
      {showResults && uploadedImage ? (
        <AnalysisResult image={uploadedImage} onReset={handleReset} />
      ) : (
        <>
          <HeroSection onImageUpload={handleImageUpload} />
          
          {isAnalyzing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full leaf-gradient animate-pulse mx-auto mb-4" />
                <p className="font-display text-xl font-semibold text-foreground">
                  Analyzing your plant...
                </p>
                <p className="text-muted-foreground">This may take a moment</p>
              </div>
            </div>
          )}
          
          <HowItWorks />
          <StatsSection />
          <FeaturesSection />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;

import { motion } from "framer-motion";
import { Upload, Leaf, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useCallback } from "react";

interface HeroSectionProps {
  onImageUpload: (file: File) => void;
}

const HeroSection = ({ onImageUpload }: HeroSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 earth-gradient" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Plant Health Analysis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
          >
            Protect Your Plants with{" "}
            <span className="text-gradient">Intelligent</span> Disease Detection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Upload a photo of your plant and get instant analysis. Our AI identifies 
            diseases, provides treatment recommendations, and helps you keep your garden thriving.
          </motion.p>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <label
              htmlFor="image-upload"
              className={`relative block cursor-pointer group`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <motion.div
                className={`
                  rounded-2xl border-2 border-dashed p-8 sm:p-12 transition-all duration-300
                  ${isDragging 
                    ? "border-primary bg-primary/10 scale-105" 
                    : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                  }
                `}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl leaf-gradient flex items-center justify-center glow-primary"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Drop your plant image here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse from your device
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Leaf className="w-3 h-3" />
                    <span>Supports JPG, PNG, WEBP</span>
                  </div>
                </div>
              </motion.div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="sr-only"
              />
            </label>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Plant Photo
                </label>
              </Button>
              <Button variant="outline" size="lg">
                <Leaf className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

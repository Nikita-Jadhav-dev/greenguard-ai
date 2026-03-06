import { motion } from "framer-motion";
import { Upload, Leaf, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState, useCallback } from "react";

interface HeroSectionProps {
  onImageUpload: (file: File) => void;
}

const HeroSection = ({ onImageUpload }: HeroSectionProps) => {

  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadToBackend = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8082/api/plants/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error("Upload failed", error);
    }

    setLoading(false);
  };

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
      uploadToBackend(files[0]);
      onImageUpload(files[0]);
    }

  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;

    if (files && files.length > 0) {

      uploadToBackend(files[0]);
      onImageUpload(files[0]);

    }

  }, [onImageUpload]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">

        <div className="max-w-4xl mx-auto text-center">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            AI-Powered Plant Health Analysis
          </span>

          <h1 className="text-5xl font-bold mt-6 mb-4">
            Protect Your Plants with Intelligent Disease Detection
          </h1>

          <p className="text-muted-foreground mb-10">
            Upload a plant photo and our AI will detect diseases and suggest treatments.
          </p>

          {/* Upload Area */}

          <label
            htmlFor="image-upload"
            className="block cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >

            <div
              className={`rounded-xl border-2 border-dashed p-10 transition-all
              ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}`}
            >

              <Upload className="w-10 h-10 mx-auto mb-4" />

              <p className="font-semibold">
                Drop your plant image here
              </p>

              <p className="text-sm text-gray-500">
                or click to browse
              </p>

            </div>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

          </label>

          <div className="mt-6 flex justify-center gap-4">

            <Button variant="hero" size="lg" asChild>

              <label htmlFor="image-upload" className="cursor-pointer flex items-center">

                <Upload className="w-5 h-5 mr-2" />
                Upload Plant Photo

              </label>

            </Button>

            <Button variant="outline" size="lg">

              <Leaf className="w-5 h-5 mr-2" />
              Try Demo

            </Button>

          </div>

          {/* AI Result */}

          {loading && <p className="mt-6">Analyzing plant...</p>}

          {result && (

            <div className="mt-8 p-6 bg-card rounded-xl shadow">

              <h3 className="text-xl font-semibold mb-2">
                Disease: {result.disease}
              </h3>

              <p>Confidence: {result.confidence}</p>

              <p className="mt-2">
                Treatment: {result.treatment}
              </p>

            </div>

          )}

        </div>
      </div>
    </section>
  );
};
export default HeroSection;
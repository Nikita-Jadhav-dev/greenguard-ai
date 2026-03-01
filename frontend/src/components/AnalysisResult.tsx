import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, Leaf, Droplets, Sun, Thermometer, XCircle } from "lucide-react";
import { Button } from "./ui/button";

interface AnalysisResultProps {
  image: string;
  onReset: () => void;
}

// Mock analysis data
const mockAnalysis = {
  plantName: "Tomato (Solanum lycopersicum)",
  disease: "Early Blight",
  confidence: 94,
  severity: "moderate" as const,
  description: "Early blight is a common fungal disease caused by Alternaria solani. It typically appears as dark brown spots with concentric rings on lower leaves first.",
  symptoms: [
    "Dark brown spots with concentric rings",
    "Yellowing around affected areas",
    "Lower leaves affected first",
    "Premature leaf drop"
  ],
  treatments: [
    "Remove and destroy infected leaves immediately",
    "Apply copper-based fungicide every 7-10 days",
    "Improve air circulation around plants",
    "Water at the base, avoid wetting leaves",
    "Mulch around plants to prevent soil splash"
  ],
  prevention: [
    "Rotate crops every 2-3 years",
    "Use disease-resistant varieties",
    "Maintain proper plant spacing",
    "Keep garden free of debris"
  ]
};

const severityConfig = {
  low: { color: "text-success", bg: "bg-success/10", icon: CheckCircle, label: "Low Severity" },
  moderate: { color: "text-warning", bg: "bg-warning/10", icon: AlertTriangle, label: "Moderate Severity" },
  high: { color: "text-destructive", bg: "bg-destructive/10", icon: XCircle, label: "High Severity" },
};

const AnalysisResult = ({ image, onReset }: AnalysisResultProps) => {
  const severity = severityConfig[mockAnalysis.severity];
  const SeverityIcon = severity.icon;

  return (
    <section className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Analysis Results
            </h2>
            <p className="text-muted-foreground">
              AI-powered diagnosis complete
            </p>
          </div>
          <Button variant="outline" onClick={onReset}>
            Analyze Another Plant
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Image & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src={image}
                alt="Analyzed plant"
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Droplets, label: "Humidity", value: "Moderate" },
                { icon: Sun, label: "Light", value: "Full Sun" },
                { icon: Thermometer, label: "Temp", value: "18-24°C" },
                { icon: Leaf, label: "Type", value: "Vegetable" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl p-4 border border-border"
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Disease Card */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Identified Plant</p>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {mockAnalysis.plantName}
                  </h3>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${severity.bg}`}>
                  <SeverityIcon className={`w-4 h-4 ${severity.color}`} />
                  <span className={`font-medium text-sm ${severity.color}`}>
                    {severity.label}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground">
                    {mockAnalysis.disease}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {mockAnalysis.confidence}% confidence
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mockAnalysis.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full leaf-gradient rounded-full"
                  />
                </div>
              </div>

              <p className="text-muted-foreground">{mockAnalysis.description}</p>
            </div>

            {/* Symptoms */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h4 className="font-display font-semibold text-foreground">Symptoms</h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {mockAnalysis.symptoms.map((symptom, i) => (
                  <motion.li
                    key={symptom}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{symptom}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Treatment */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h4 className="font-display font-semibold text-foreground">
                  Recommended Treatment
                </h4>
              </div>
              <ol className="space-y-3">
                {mockAnalysis.treatments.map((treatment, i) => (
                  <motion.li
                    key={treatment}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full leaf-gradient text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground pt-0.5">{treatment}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Prevention */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-accent" />
                <h4 className="font-display font-semibold text-foreground">Prevention Tips</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {mockAnalysis.prevention.map((tip, i) => (
                  <motion.div
                    key={tip}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground"
                  >
                    {tip}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResult;

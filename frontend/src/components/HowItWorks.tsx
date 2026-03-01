import { motion } from "framer-motion";
import { Camera, Search, FileText, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Capture",
    description: "Take a clear photo of the affected area of your plant. Good lighting helps improve accuracy."
  },
  {
    icon: Search,
    step: "02",
    title: "Analyze",
    description: "Our AI instantly processes your image, comparing it against thousands of plant disease patterns."
  },
  {
    icon: FileText,
    step: "03",
    title: "Diagnose",
    description: "Receive a detailed diagnosis with disease identification, severity level, and confidence score."
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Treat",
    description: "Follow our personalized treatment plan to nurse your plant back to health."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 earth-gradient" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your plant diagnosed in four simple steps
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/0" />
              )}
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative inline-flex"
              >
                <div className="w-24 h-24 rounded-2xl leaf-gradient flex items-center justify-center glow-primary mb-4">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center glow-accent">
                  {step.step}
                </span>
              </motion.div>
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
